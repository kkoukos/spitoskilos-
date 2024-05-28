import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("listings");
    console.log("Connected to MongoDB.");

    const data = await db.collection("Residences").findOne({ _id: id });
    // const data = await db.collection("Residences").findOne({_id: new ObjectId("6634ff0bc2a272c8dd47c997")});
    // console.log("Data retrieved:", data);

    console.log("Data received.");

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
