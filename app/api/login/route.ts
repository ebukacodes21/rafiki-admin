import ApiConfig from "@/services/Apiconfig";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { method } = request;
    const body = await request.json();

    try {
        const res = await axios({
            method: method,
            url: ApiConfig.login,
            data: body,
        });

        const response = NextResponse.json(res.data);
        if (res.headers["set-cookie"]) {
            response.headers.append("set-cookie", res.headers["set-cookie"][0]);
        }

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.response.data }, { status: error.response.status });
    }
}