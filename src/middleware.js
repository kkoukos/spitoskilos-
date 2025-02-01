import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];
const publicRoutes = ["/"];
const credRoutes = ["/login", "/signup"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isCredRoute = credRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  // Get session from cookies
  const sessionCookie = req.cookies.get("session");
  let session = null;

  if (sessionCookie?.value) {
    try {
      // Since we're storing the whole user object in the session, parse it
      session = JSON.parse(sessionCookie.value);
    } catch (e) {
      console.error("Failed to parse session:", e);
      session = null;
    }
  }

  // Redirect logic
  if (isCredRoute && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (session.type !== 1) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Add user info to headers for route handlers if session exists
  const response = NextResponse.next();
  if (session) {
    response.headers.set(
      "x-user-info",
      JSON.stringify({
        userId: session._id,
        username: session.username,
        type: session.type,
      })
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
