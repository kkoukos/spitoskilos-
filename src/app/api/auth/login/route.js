"use server";

import { cookies } from "next/headers";
import { signIn } from "../.././../lib/auth";
import { serialize } from "v8";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { username, password } = await req.json();

    const { success, message } = await signIn(username, password);

    // console.log(cookies().get("session"));

    if (success) {
      const session = JSON.stringify(message);

      cookies().set("session", session, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return Response.json({
        success: true,
        message: "Successfully set cookie!",
      });
    } else if (message === "userfound") {
      console.log("bad creds");
    }

    return Response.json({
      success: false,
      message: "Wrong username/email or password",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong." });
  }
}
