import { COOKIE_NAME } from "@/constants";
import ApiConfig from "@/services/Apiconfig";
import axios from "axios";
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { method, cookies } = request; 
  const data = await request.formData(); 
  const token = cookies.get(COOKIE_NAME)?.value || ""; 

  const file = data.get('file');
  if (!file) {
    return NextResponse.json({ message: "No file provided" }, { status: 400 });
  }

  try {
    const res = await axios({
      method,
      url: ApiConfig.upload, 
      headers: {
        Authorization: `Bearer v2.local.cqzkpOluugNS0EnSZNPGceDyASg5rdlXRIqxX8_9fiaJvn-nV5-YoG9qNPcwIa_Un_7dAMWkh1M0y7PKb4WD9z_Gm_ME6XIGk6oLYRtkfHZZ-DrbMby3pZPhkoWKVPDhDa80bxJNcDnmKfWG67nPgFskti8gAZTmAm7ZvdF-d5sTWyTk9bd72UIeGpie1QIDHYxJdCt8ikEpD9dlw_CLMqVh3skaMA9pg2WTErf_5jU4NXJKGvD1KBgjorGpEhKqQCtePwa1G0xZ40RKhObckRwbvbdoC39u2xLk5skG2Us3e3-VNgis0NoNMewGJ6EF_MvhFRgEIP5R6BwOmt1DFVrQJQ.bnVsbA`,  
      },
      data
    });

    return NextResponse.json(res.data);  
  } catch (error: any) {
    return NextResponse.json({ message: error.response?.data || "File upload failed" }, { status: error.response?.status || 500 });
  }
}