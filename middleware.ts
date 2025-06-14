import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, routes } from "./constants";

export async function middleware(request: NextRequest) {
    const cookie = request.cookies.get(COOKIE_NAME)?.value || "";
    const pathName = request.nextUrl.pathname;

    const isPublicPath =
        pathName === routes.HOME ||
        pathName === routes.LOGIN ||
        pathName === routes.SIGNUP ||
        pathName === routes.VERIFY ||
        pathName === routes.RESET ||
        pathName === routes.FORGOT;


    if (isPublicPath && cookie) {
        return NextResponse.redirect(new URL(routes.DASHBOARD, request.nextUrl));
    }

    if (!isPublicPath && !cookie) {
        return NextResponse.redirect(new URL(routes.LOGIN, request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth-pages/login',
        '/auth-pages/signup',
        '/auth-pages/verify',
        '/auth-pages/forgot',
        '/auth-pages/reset',

        '/dashboard',
        '/loans',
        '/settings'
    ],
};