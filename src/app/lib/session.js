"use server";

import { cookies } from "next/headers";

export default async function getSession() {
  const sessionCookie = cookies().get("session")?.value;

  if (sessionCookie) {
    return sessionCookie;
  }
  return null;
}
