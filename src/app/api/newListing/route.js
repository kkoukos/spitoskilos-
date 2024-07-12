import clientPromise from "../../lib/db";

export async function POST(req) {
  try {
    const { formData } = await req.json();

    console.log(formData);

    return Response.json({ success: true });
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
