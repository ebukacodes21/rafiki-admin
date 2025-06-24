import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import ApiConfig from '@/services/api-config'; 
import { COOKIE_NAME, routes } from '@/constants';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    // Exchange code for tokens
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_CONNECT,
      grant_type: "authorization_code",
    });

    await axios.post(ApiConfig.connectCalendar, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.redirect(new URL(`${routes.OFFICER_HOURS}?tab=settings`, request.url));
  } catch (error: any) {
    console.error("OAuth Callback Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "OAuth token exchange failed" }, { status: 500 });
  }
}