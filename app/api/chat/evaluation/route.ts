import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { story, characters } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: "You are an expert story analyst. Evaluate the given story and provide a brief summary of each character's role in the story. Focus on how well the characters were integrated into the narrative. Respond in 500 characters or less, without using markdown.",
      },
      {
        role: "user",
        content: `Story: ${story}\n\nCharacters: ${JSON.stringify(characters)}`,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}