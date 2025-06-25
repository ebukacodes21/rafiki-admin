import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country") || "nigeria";

  try {
    const res = await axios.get(`https://api.paystack.co/bank?country=${country}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    return NextResponse.json(res.data); // Includes { status, message, data }
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
