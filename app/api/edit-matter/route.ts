import { COOKIE_NAME } from "@/constants";
import ApiConfig from "@/services/api-config";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const { method, url } = request;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const body = await request.json();
  const object = new URL(url);
  const { searchParams } = object;

  try {
    const res = await axios({
      method: method,
      url: ApiConfig.editMatter,
      params: {
        matterId: searchParams.get("matterId"),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });

    return NextResponse.json(res.data);
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
