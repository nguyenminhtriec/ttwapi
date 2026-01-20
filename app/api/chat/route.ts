
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: await convertToModelMessages(messages),
    system: 'Your response should be concise and to the point and not more than 150 words. Don\'t use Markdown text.',
  });

  return result.toUIMessageStreamResponse();
  // return result.toDataStreamResponse(); // use with openAi models
}