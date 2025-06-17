import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, routes } from "./constants";
import { V2 } from "paseto"; // if using v2 tokens
import * as fs from "fs/promises";

const PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY!; // from backend or file

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicPath = [
    routes.HOME,
    routes.ACCOUNTS,
    routes.LOGIN,
    routes.SIGNUP,
    routes.FORGOT,
    routes.RESET,
    routes.VERIFY,
    routes.CALLBACK_SIGNIN,
    routes.CALLBACK_SIGNUP,
  ].includes(pathname);

  if (token) {
    try {
      const payload = await V2.verify(token, PUBLIC_KEY, {
        audience: "rafiki-admin",
        issuer: "rafiki",
      });

      const isOnboarded = payload.is_onboarded;

      if (pathname === routes.ONBOARD && isOnboarded) {
        return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
      }

      if (!isOnboarded && pathname !== routes.ONBOARD) {
        return NextResponse.redirect(new URL(routes.ONBOARD, request.url));
      }

      if (isPublicPath) {
        return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
      }

    } catch (err) {
      console.error("Token validation failed:", err);
      return NextResponse.redirect(new URL(routes.LOGIN, request.url));
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL(routes.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/verify',
    '/auth/forgot',
    '/auth/reset',
    '/auth/accounts',
    '/auth/callback-signup',
    '/auth/callback-signin',
    '/dashboard',
     '/task',
    '/onboard',
     "/online-firm"
  ],
};