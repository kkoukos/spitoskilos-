import { cookies } from "next/headers";
import clientPromise from "../../lib/db";
import supabase from "../../lib/dbimage";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const username = formData.get("username");

    // Validate file
    if (!file) {
      return Response.json({ success: false, error: "No file provided" });
    }

    const client = await clientPromise;
    const db = client.db("users");
    const userpfp = await db
      .collection("users")
      .find({ username: username })
      .toArray();

    if (!userpfp.length) {
      return Response.json({ success: false, error: "User not found" });
    }

    let uploadResponse;

    if (!userpfp[0].profile_picture) {
      // For new uploads
      uploadResponse = await supabase.storage
        .from("userphotos")
        .upload(`${username}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
    } else {
      // For updates
      // First remove the existing file
      await supabase.storage.from("userphotos").remove([username]);

      // Then upload the new one
      uploadResponse = await supabase.storage
        .from("userphotos")
        .upload(`${username}`, file, {
          cacheControl: "3600",
          upsert: true,
        });
    }

    if (uploadResponse.error) {
      console.error("Supabase upload error:", uploadResponse.error);
      return Response.json({
        success: false,
        error: uploadResponse.error.message,
      });
    }

    // Get the public URL
    const { data: urlData } = await supabase.storage
      .from("userphotos")
      .getPublicUrl(username);

    if (!urlData.publicUrl) {
      return Response.json({
        success: false,
        error: "Failed to get public URL",
      });
    }

    // Update MongoDB
    const result = await db
      .collection("users")
      .updateOne(
        { username: username },
        { $set: { profile_picture: urlData.publicUrl } }
      );

    // Update session cookie
    const session = cookies().get("session");
    if (session) {
      let sessionObject = JSON.parse(session.value);
      sessionObject.profile_picture = urlData.publicUrl;
      const new_session = JSON.stringify(sessionObject);

      cookies().delete("session");
      cookies().set("session", new_session, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    return Response.json({
      success: true,
      url: urlData.publicUrl,
    });
  } catch (e) {
    console.error("API error:", e);
    return Response.json({
      success: false,
      error: e.message,
      stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
    });
  }
}
