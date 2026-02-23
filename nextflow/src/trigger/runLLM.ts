import { task } from "@trigger.dev/sdk/v3";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runLLMTask = task({
    id: "run-llm",
    maxDuration: 120,
    run: async (payload: {
        model: string;
        systemPrompt?: string;
        userMessage: string;
        images?: string[];
        temperature?: number;
    }) => {
        const { model, systemPrompt, userMessage, images, temperature = 0.7 } =
            payload;

        if (!model.startsWith("gemini")) {
            throw new Error(`Only Gemini models are supported. Received: ${model}`);
        }

        return await callGemini({
            model,
            systemPrompt,
            userMessage,
            images,
            temperature,
        });
    },
});

async function callGemini(opts: LLMOpts): Promise<LLMResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not set");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: opts.model });

    const parts: any[] = [{ text: opts.userMessage }];

    if (opts.images?.length) {
        for (const img of opts.images) {
            // Extract mimetype and base64 from data URI if present
            let mimeType = "image/png";
            let base64Data = img;

            const match = img.match(/^data:(image\/\w+);base64,(.+)$/);
            if (match) {
                mimeType = match[1];
                base64Data = match[2];
            } else {
                base64Data = img.replace(/^data:image\/\w+;base64,/, "");
            }

            parts.push({
                inlineData: {
                    data: base64Data,
                    mimeType,
                },
            });
        }
    }

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            ...(opts.systemPrompt && { systemInstruction: opts.systemPrompt }),
            generationConfig: {
                temperature: opts.temperature,
            },
        });

        const response = result.response;
        const text = response.text();

        return {
            text,
            model: opts.model,
            tokensUsed: response.usageMetadata?.totalTokenCount ?? text.length,
        };
    } catch (err: any) {
        throw new Error(`Gemini SDK error: ${err.message}`);
    }
}

// --- types ---

interface LLMOpts {
    model: string;
    systemPrompt?: string;
    userMessage: string;
    images?: string[];
    temperature: number;
}

interface LLMResult {
    text: string;
    model: string;
    tokensUsed: number;
}