// app/api/auth/login/route.js
"use server";
import { cookies } from "next/headers";
import { signIn, handleGoogleLogin } from "../.././../lib/auth";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();

    // Handle Google login
    if (body.googleCredential) {
      const { success, message } = await handleGoogleLogin(
        body.googleCredential
      );

      if (success) {
        // Store user data in session
        cookies().set("session", JSON.stringify(message), {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24, // 24 hours
        });

        return Response.json({
          success: true,
          message: "Successfully logged in with Google!",
        });
      }

      return Response.json({
        success: false,
        message: message || "Google authentication failed",
      });
    }

    // Regular login
    const { username, password } = body;
    const { success, message } = await signIn(username, password);

    if (success) {
      // Store user data in session
      cookies().set("session", JSON.stringify(message), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return Response.json({
        success: true,
        message: "Successfully logged in!",
      });
    }

    return Response.json({
      success: false,
      message: "Wrong username/email or password",
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({
      success: false,
      message: "Something went wrong.",
    });
  }
}
