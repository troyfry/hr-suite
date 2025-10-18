import { NextResponse } from "next/server";

// Simple rules so answers are safe + scoped
function safeReply({ state, question }) {
  const st = String(state || "").toUpperCase();
  return [
    `Here’s general guidance for ${st}. This is not legal advice.`,
    `• I cannot verify current statutes in real time here.`,
    `• Check your company’s handbook and counsel for final decisions.`,
    ``,
    `For your question: "${question}"`,
    `- If this relates to wages, overtime, or breaks, verify with your state labor agency site.`,
    `- If it touches leave/LOA, review federal baseline (FMLA) plus ${st}-specific leave laws.`,
    `- For policy wording, ensure plain language, who/when/what coverage, and escalation steps are clear.`,
  ].join("\n");
}

export async function POST(req) {
  try {
    const { state, messages } = await req.json();
    const last = Array.isArray(messages) ? messages[messages.length - 1] : null;
    const question = last?.role === "user" ? last.content : "";

    return NextResponse.json({ reply: safeReply({ state, question }) });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Bad request" }, { status: 400 });
  }
}
