"use client";
import { useState } from "react";
import { STATES } from '../../lib/states';
import { useRouter } from "next/navigation";

export default function SelectLocation() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = STATES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-xl mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Select Your State</h1>
      <input
        type="text"
        placeholder="Start typing..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border w-full p-3 rounded-md mb-6"
      />
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(s => (
          <button
            key={s.code}
            onClick={() => router.push(`/dashboard/${s.code}`)}
            className="border rounded-md py-2 hover:bg-blue-50"
          >
            {s.name}
          </button>
        ))}
      </div>
    </main>
  );
}
