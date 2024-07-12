"use server";

import { cookies } from "next/headers";
import { deleteUser } from "../.././../lib/auth";
import { serialize } from "v8";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { username } = await req.json();

    const { success, message } = await deleteUser(username);

    if (success) {
      cookies().delete("session");

      return Response.json({
        success: true,
        message: "Successfully delete cookie!",
      });
    }
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong." });
  }
}
