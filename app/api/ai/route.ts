import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question, state } = await req.json();
  const reply = `Stub answer for ${state?.toUpperCase()}: 
This is an informational sample. 
Question: "${question || 'No question provided.'}"`;
  return NextResponse.json({ answer: reply });
}
