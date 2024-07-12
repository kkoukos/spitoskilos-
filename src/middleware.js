import { NextResponse } from "next/server";

import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];
const publicRoutes = ["/"];
const credRoutes = ["/login", "/signup"];

export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isCredRoute = credRoutes.includes(path);
  const isAdminRoute = adminRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const sessionCookie = cookies().get("session")?.value;

  if (isCredRoute && sessionCookie) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  }
  if (isAdminRoute && !sessionCookie) {
    return NextResponse.redirect(`${req.nextUrl.origin}/`);
  } else {
    if (isAdminRoute && sessionCookie.type == 0) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
    }
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
