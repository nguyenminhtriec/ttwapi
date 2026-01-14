
import {google} from '@ai-sdk/google';
import {streamText} from 'ai';


export async function POST(request: Request) {
  const {prompt} = await request.json();
  const result = streamText({
    model: google('gemini-2.5-flash'),
    prompt: `Write a poem about ${prompt}`,
    system: 'Always give answers in not more than 150 words.',
  });
  // const readableStream = result.toUIMessageStreamResponse({
  //   headers: {
  //     "Content-Type": "text/plain; charset=utf-8",
  //     "Content-Encoding": "none",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "POST, OPTIONS",
  //     "Access-Control-Allow-Headers": "Content-Type",
  //   },
  // });

  return result.toUIMessageStreamResponse();
}

/* export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
} */