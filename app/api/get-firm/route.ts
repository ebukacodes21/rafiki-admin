import { COOKIE_NAME } from "@/constants";
import ApiConfig from "@/services/api-config";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { method } = request;
  const token = request.cookies.get(COOKIE_NAME)?.value;

    try {
        const res = await axios({
            method: method,
            url: ApiConfig.getAdminFirm,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return NextResponse.json(res.data);
    } catch (error: any) {
        if (error.code === "ECONNREFUSED"){
            return NextResponse.json({ error: error.errors}, {status: 500})
        }
        return NextResponse.json({ error: error.response?.data }, { status: error.response.status });
    }
}