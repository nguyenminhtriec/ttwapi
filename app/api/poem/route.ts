

import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
    const {subject} = await request.json();
    const ai = new GoogleGenAI({apiKey: process.env.G_KEY});
    const aiStream = await ai.models.generateContentStream({
        model:'gemini-2.5-flash',
        contents: "Write a poem about " + subject || "nature",
        config: {
            // systemInstruction: 'Always give answers in not more than 200 words.'
        }
    }).catch((error) => {
        console.error("API Error:", error.messages);
        return null;
    });
    if (!aiStream) {
        return new Response("Error generating content", {status: 500});
    }
    console.log("aiStream initialized");
    
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of aiStream) {
                    const text = chunk.text;
                    controller.enqueue(encoder.encode(text));
                }
            } catch(err) {
                controller.enqueue(encoder.encode('Error generating content'));
                controller.close();
            } finally {
                controller.close();
            }
        }
    });
    return new Response(readable, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        }
    });
}