import ApiConfig from "@/services/Apiconfig";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { method } = request;
    const body = await request.json();

    try {
        const res = await axios({
            method: method,
            url: ApiConfig.onboard,
            headers: {
                 Authorization: `Bearer v2.local.cqzkpOluugNS0EnSZNPGceDyASg5rdlXRIqxX8_9fiaJvn-nV5-YoG9qNPcwIa_Un_7dAMWkh1M0y7PKb4WD9z_Gm_ME6XIGk6oLYRtkfHZZ-DrbMby3pZPhkoWKVPDhDa80bxJNcDnmKfWG67nPgFskti8gAZTmAm7ZvdF-d5sTWyTk9bd72UIeGpie1QIDHYxJdCt8ikEpD9dlw_CLMqVh3skaMA9pg2WTErf_5jU4NXJKGvD1KBgjorGpEhKqQCtePwa1G0xZ40RKhObckRwbvbdoC39u2xLk5skG2Us3e3-VNgis0NoNMewGJ6EF_MvhFRgEIP5R6BwOmt1DFVrQJQ.bnVsbA`,  
            },
            data: body,
        });

        return NextResponse.json(res.data);
    } catch (error: any) {
        if (error.code === "ECONNREFUSED"){
            return NextResponse.json({ error: error.errors}, {status: 500})
        }
        return NextResponse.json({ error: error.response?.data }, { status: error.response?.status });
    }
}