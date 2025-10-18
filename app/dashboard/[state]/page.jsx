"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import AskForm from "../../../components/AskForm.jsx";
import AnswerCard from "../../../components/AnswerCard.jsx";

export default function Dashboard() {
  const { state } = useParams();
  const [answer, setAnswer] = useState(null);

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">State of HR GPT — {state.toUpperCase()} Mode</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
        <a href={`/dashboard/${state}/document`} className="border rounded-md p-4 hover:bg-blue-50">
          <h3 className="font-semibold">Document Review</h3>
          <p className="text-sm text-gray-500">Upload a policy to check for updates.</p>
        </a>
        <a href={`/dashboard/${state}/qa`} className="border rounded-md p-4 hover:bg-blue-50">
  <h3 className="font-semibold">Compliance Q&A</h3>
  <p className="text-sm text-gray-500">Ask questions about regulations.</p>
</a>

        <a href="#" className="border rounded-md p-4 hover:bg-blue-50">
          <h3 className="font-semibold">Policy Templates</h3>
          <p className="text-sm text-gray-500">Ready-to-edit docs by state.</p>
        </a>
      </div>

   
    </main>
  );
}
