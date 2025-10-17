"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function DocumentUpload() {
  const { state } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!file) {
      setError("Please choose a PDF to upload.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);
      form.append("state", state);

      const res = await fetch("/api/review", { method: "POST", body: form });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Upload failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto py-10">
      <a href={`/dashboard/${state}`} className="text-sm text-blue-600">&larr; Back to dashboard</a>
      <h1 className="text-2xl font-bold mt-2 mb-4">Document Review — {state.toUpperCase()}</h1>
      <p className="text-gray-600 mb-6">
        Upload a PDF (Code of Conduct, PTO policy, or Handbook section). We’ll return a stubbed review for now.
      </p>

      <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm"
        />

        {file && (
          <div className="text-sm text-gray-600">
            Selected: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)
          </div>
        )}

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Upload & Review"}
        </button>
      </form>

      {result && (
        <div className="mt-6 border rounded-md p-4">
          <h2 className="font-semibold mb-2">Review Summary</h2>
          <p className="text-gray-700 mb-3">{result.summary}</p>
          {Array.isArray(result.sections) && result.sections.length > 0 && (
            <>
              <h3 className="font-medium">Potential Areas to Update</h3>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {result.sections.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </main>
  );
}
