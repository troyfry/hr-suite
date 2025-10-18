"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function ComplianceChat() {
  const { state } = useParams(); // e.g., "az"
  const [messages, setMessages] = useState([
    { role: "assistant", content: `You're in ${String(state).toUpperCase()} mode. Ask a compliance question to begin.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, messages: next })
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json(); // { reply: "..." }
      setMessages(m => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", content: `Sorry — something went wrong: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto py-8">
      <a href={`/dashboard/${state}`} className="text-sm text-blue-600">&larr; Back</a>
      <h1 className="text-2xl font-bold mt-2 mb-4">Compliance Q&A — {String(state).toUpperCase()}</h1>

      <div ref={listRef} className="border rounded-md p-4 h-[48vh] overflow-y-auto bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-3 py-2 rounded-lg text-sm leading-6
              ${m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 animate-pulse">
              Thinking…
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask a compliance question for ${String(state).toUpperCase()}…`}
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          Send
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-3">
        Info provided is for general guidance only and not legal advice.
      </p>
    </main>
  );
}
