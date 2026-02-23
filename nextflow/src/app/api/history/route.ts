import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const workflowId = url.searchParams.get("workflowId");

        const history = await prisma.workflowRun.findMany({
            where: {
                userId,
                ...(workflowId ? { workflowId } : {})
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ history });
    } catch (err: any) {
        console.error("GET history error:", err);
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
        const { workflowId, status, runType, duration, nodes } = body;

        if (!workflowId) {
            return NextResponse.json({ error: "workflowId required" }, { status: 400 });
        }

        const newRun = await prisma.workflowRun.create({
            data: {
                userId,
                workflowId,
                status: status || 'success',
                runType: runType || 'full',
                duration: duration || 0,
                nodes: nodes || []
            }
        });

        return NextResponse.json({ success: true, run: newRun });
    } catch (err: any) {
        console.error("POST history error:", err);
        return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
    }
}
