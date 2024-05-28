import { cookies } from "next/headers";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";
import { SupervisorAccount } from "@mui/icons-material";

export async function POST(req) {
  try {
    const { listing_id } = await req.json();
    const user = JSON.parse(cookies().get("session").value);

    console.log(user._id);

    const client = await clientPromise;
    const db = client.db("users");
    console.log("Connected to MongoDB.");

    const updatedData = await db
      .collection("favorites")
      .find({ _id: user._id })
      .toArray();

    const favorites = updatedData[0].favorites;
    console.log(favorites);

    if (favorites.includes(listing_id)) {
      console.log("Favorites exists.");

      return Response.json({
        success: false,
        message: "Favorite already exists",
      });
    }

    const result = await db
      .collection("favorites")
      .updateOne({ _id: user._id }, { $push: { favorites: listing_id } });

    const session = cookies().get("session").value;
    let sessionObject = JSON.parse(session);
    console.log(sessionObject);
    console.log(sessionObject.favorites);
    sessionObject.favorites.push(listing_id);

    const new_session = JSON.stringify(sessionObject);

    console.log(sessionObject);

    cookies().delete("session");

    cookies().set("session", new_session, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return Response.json({
      success: true,
      message: "Favorite added",
    });
  } catch (e) {
    console.error("API error:", e.message);
    return Response.json({ error: e.message });
  }
}
