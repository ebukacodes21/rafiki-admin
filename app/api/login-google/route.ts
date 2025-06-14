import ApiConfig from "@/services/Apiconfig";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';
import { COOKIE_NAME } from "@/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const res = await axios.post(ApiConfig.loginGoogle, body);

    const token = res.data?.token;
    const isOnboarded = res.data?.admin?.isOnboarded;

    const response = NextResponse.json(res.data);

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, 
    });

    response.cookies.set("is_onboarded", isOnboarded ? "true" : "false", {
      httpOnly: false, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorMsg = error.response?.data || { error: "Internal Server Error" };
    return NextResponse.json(errorMsg, { status });
  }
}