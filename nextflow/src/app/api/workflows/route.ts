import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Strip large binary data (base64 images/videos) from nodes before saving to DB
function stripBinaryData(nodes: any[]): any[] {
    return nodes.map((node: any) => {
        const cleanData = { ...node.data };

        // Remove base64 data URLs but keep metadata
        if (cleanData.imageUrl && typeof cleanData.imageUrl === 'string' && cleanData.imageUrl.startsWith('data:')) {
            cleanData.imageUrl = null; // Strip binary, keep fileName/fileSize
            cleanData.hadImage = true; // Flag that an image was present
        }
        if (cleanData.videoUrl && typeof cleanData.videoUrl === 'string' && cleanData.videoUrl.startsWith('data:')) {
            cleanData.videoUrl = null;
            cleanData.hadVideo = true;
        }
        // Strip result data URLs (crop/extract outputs) but keep text results
        if (cleanData.result && typeof cleanData.result === 'string' && cleanData.result.startsWith('data:')) {
            cleanData.result = null;
            cleanData.hadResult = true;
        }

        return { ...node, data: cleanData };
    });
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const workflows = await prisma.workflow.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json({ workflows });
    } catch (err: any) {
        console.error("GET workflows error:", err);
        return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, desc, nodes, edges, id } = body;

        // Strip binary data before saving
        const cleanNodes = stripBinaryData(nodes || []);

        if (id) {
            const existing = await prisma.workflow.findUnique({ where: { id } });
            if (existing && existing.userId !== userId) {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }

            if (existing) {
                const wf = await prisma.workflow.update({
                    where: { id },
                    data: { name, desc, nodes: cleanNodes, edges: edges || [] }
                });
                return NextResponse.json({ workflow: wf });
            }
        }

        const wf = await prisma.workflow.create({
            data: {
                userId,
                name: name || 'Untitled Workflow',
                desc: desc || '',
                nodes: cleanNodes,
                edges: edges || []
            }
        });

        return NextResponse.json({ workflow: wf });
    } catch (err: any) {
        console.error("POST workflows error:", err);
        return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
    }
}
