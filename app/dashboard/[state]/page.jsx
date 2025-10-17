"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import AskForm from "@/components/AskForm.jsx";
import AnswerCard from "@/components/AnswerCard.jsx";

export default function Dashboard() {
  const params = useParams();
  const stateParam = (params?.state) ?? "";
  const [answer, setAnswer] = useState(null);

  return (
    <main className="max-w-2xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-2">
        State of HR GPT — {stateParam.toUpperCase()} Mode
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Ask compliance questions specific to your location.
      </p>
      <AskForm state={stateParam} onAnswer={setAnswer} />
      {answer && <AnswerCard text={answer} />}
    </main>
  );
}
