import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const state = String(form.get("state") || "").toUpperCase();

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // MVP: we are not parsing the PDF yet.
    // In Phase 2, read the file like:
    // const bytes = await file.arrayBuffer(); // then send to your analyzer

    return NextResponse.json({
      summary: `Stub review: We received "${file.name}" for ${state}. 2 sections may need updating.`,
      sections: ["Meal & Rest Breaks", "Wage Transparency"],
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
