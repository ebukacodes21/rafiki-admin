"use server";

import { V2 } from "paseto";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

const PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY!;

export async function getUserFromToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME)?.value;
console.log(token)
  if (!token) return null;

  try {
    const payload = await V2.verify(token, PUBLIC_KEY, {
      audience: "rafiki-admin",
      issuer: "rafiki",
    });

    return payload; 
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
