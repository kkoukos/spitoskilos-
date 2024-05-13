"use server";

import { cookies } from "next/headers";
import { signIn } from "../.././../lib/auth";
import { serialize } from "v8";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { username, password } = await req.json();
    console.log(username, password);
    const result = await signIn(username, password);
    console.log(result);
    // console.log(cookies());
    if (result) {
      cookies().set("session", username, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      return Response.json({ message: "Successfully set cookie!" });
    } else {
      console.log("bad creds");
    }

    return Response.json({ success: false });
  } catch (error) {
    console.log(error);
    if (error.type === "CredentialsSignin") {
      return Response.json({ error: "Invalid credentials." });
    } else {
      return Response.json({ error: "Something went wrong." });
    }
  }
}
