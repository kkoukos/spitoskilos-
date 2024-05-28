import { cookies } from "next/headers";
import clientPromise from "../../lib/db";
import supabase from "../../lib/dbimage";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const client = await clientPromise;
    const db = client.db("users");

    const userpfp = await db
      .collection("users")
      .find({ username: formData.get("username") })
      .toArray();

    if (userpfp[0].profile_picture === "") {
      const { data, error } = await supabase.storage
        .from("userphotos")
        .upload(formData.get("username"), formData.get("file"));

      const link = await supabase.storage
        .from("userphotos")
        .getPublicUrl(formData.get("username"));
      const database = client.db("users");
      const users = database.collection("users");
      const filter = { username: formData.get("username") };
      const updateDoc = {
        $set: {
          profile_picture: link.data.publicUrl,
        },
      };
      const result = await users.updateOne(filter, updateDoc);

      const session = cookies().get("session").value;
      let sessionObject = JSON.parse(session);

      sessionObject.profile_picture = link.data.publicUrl;

      const new_session = JSON.stringify(sessionObject);

      console.log(sessionObject);

      cookies().delete("session");

      cookies().set("session", new_session, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return Response.json({ success: true });
    } else {
      const { data, error } = await supabase.storage
        .from("userphotos")
        .update(formData.get("username"), formData.get("file"));

      return Response.json({ success: true });
    }

    return Response.json({ success: false });
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
