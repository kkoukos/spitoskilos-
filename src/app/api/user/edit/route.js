import { cookies } from "next/headers";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { name, email, phone } = await req.json();
    const session = cookies().get("session").value;
    let sessionObject = JSON.parse(session);

    console.log(name, email, phone);

    console.log(sessionObject);

    const client = await clientPromise;
    const db = client.db("users");
    console.log("Connected to MongoDB.");
    const result = await db.collection("users").updateOne(
      { _id: sessionObject._id },
      {
        $set: {
          name: name,
          phone: phone,
          email: email,
        },
      }
    );

    sessionObject.name = name;
    sessionObject.email = email;
    sessionObject.phone = phone;

    const new_session = JSON.stringify(sessionObject);

    console.log(sessionObject);

    cookies().delete("session");

    cookies().set("session", new_session, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return Response.json(data);
  } catch (e) {
    console.error("API error:", e.message);
    return Response.json({ error: e.message });
  }
}
