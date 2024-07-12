import clientPromise from "../../lib/db";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    console.log("Connected to MongoDB.");

    const data = await db.collection("users").find({}).toArray();
    // console.log("Data retrieved:", data);
    console.log("Data received.");

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
