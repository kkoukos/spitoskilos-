"use server";

import { cookies } from "next/headers";
import { signUp, signIn } from "../.././../lib/auth";
import { serialize } from "v8";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { name, username, password, email, phone } = await req.json();
    console.log(username, password);
    const { success, result } = await signUp(
      name,
      username,
      password,
      email,
      phone
    );

    if (success) {
      const { success2, message } = await signIn(username, password);
      const session = JSON.stringify(message);
      console.log(message);
      cookies().set("session", session, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }

    return Response.json({ success: success });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong." });
  }
}
