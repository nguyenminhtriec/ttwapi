
import {google} from '@ai-sdk/google';
import {streamText} from 'ai';


export async function POST(request: Request) {
  const {topic} = await request.json();
  const result = streamText({
    model: google('gemini-2.5-flash'),
    prompt: `Write a poem about ${topic}`,
    system: 'Always give answers in not more than 150 words.',
  });
  const textStream = result.textStream;

  return new Response(textStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Access-Control-Allow-Origin': '*', // Uncomment if CORS is needed
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}