import ApiConfig from "@/services/api-config";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';
import { COOKIE_NAME } from "@/constants";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = request.cookies.get(COOKIE_NAME)?.value;

  try {
    const res = await axios.post(ApiConfig.onboard, body, {
      withCredentials: true,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const response = NextResponse.json(res.data);

    const setCookie = res.headers['set-cookie'];
    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie) =>
          response.headers.append('set-cookie', cookie)
        );
      } else {
        response.headers.set('set-cookie', setCookie);
      }
    }

    return response;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorMsg = error.response?.data || { error: "Internal Server Error" };
    return NextResponse.json(errorMsg, { status });
  }
}