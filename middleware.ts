import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, routes } from "./constants";

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
    if (isPublicPath) {
      return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
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
    '/online-firm',
  ],
};