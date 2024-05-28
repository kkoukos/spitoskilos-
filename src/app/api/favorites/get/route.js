import { cookies } from "next/headers";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";
import { SupervisorAccount } from "@mui/icons-material";

export async function POST(req) {
  try {
    const { listing_id } = await req.json();
    const user = JSON.parse(cookies().get("session").value);

    const client = await clientPromise;
    const db = client.db("users");
    console.log("Connected to MongoDB.");

    const updatedData = await db
      .collection("favorites")
      .find({ _id: user._id })
      .toArray();

    const favorites = updatedData[0].favorites;
    console.log(favorites);

    return Response.json({
      success: true,
      message: favorites,
    });
  } catch (e) {
    console.error("API error:", e.message);
    return Response.json({ error: e.message });
  }
}
