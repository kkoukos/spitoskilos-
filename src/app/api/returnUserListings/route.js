import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { user_id } = await req.json();
    console.log(user_id);
    const client = await clientPromise;
    const db = client.db("listings");
    console.log("Connected to MongoDB.");

    const data = await db
      .collection("Residences")
      .find({ user_id: user_id })
      .toArray();
    // console.log("Data retrieved:", data);
    console.log("Data received.");

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e.message);
    return Response.json({ error: e.message });
  }
}
