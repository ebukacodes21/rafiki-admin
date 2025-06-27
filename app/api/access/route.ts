import ApiConfig from "@/services/api-config";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { method, url } = request;
  const object = new URL(url);
  const { searchParams } = object;

  try {
    const res = await axios({
      method: method,
      url: ApiConfig.grantAccess,
      params: {
        token: searchParams.get("token"),
      },
    });

    const response = NextResponse.json(res.data);

    const setCookie = res.headers["set-cookie"];
    if (setCookie) {
      if (Array.isArray(setCookie)) {
        setCookie.forEach((cookie) =>
          response.headers.append("set-cookie", cookie)
        );
      } else {
        response.headers.set("set-cookie", setCookie);
      }
    }

    return response;
  } catch (error: any) {
    if (error.code === "ECONNREFUSED") {
      return NextResponse.json({ error: error.errors }, { status: 500 });
    }
    return NextResponse.json(
      { error: error.response?.data },
      { status: error.response.status }
    );
  }
}
