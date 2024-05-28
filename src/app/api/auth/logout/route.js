"use server";

import { cookies } from "next/headers";
import { logOut } from "../.././../lib/auth";
import { serialize } from "v8";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { success, message } = await logOut();
    console.log(success);

    return Response.json({ success: success, message: message });
  } catch (error) {
    console.log(error);

    return Response.json({ error: "Something went wrong." });
  }
}
