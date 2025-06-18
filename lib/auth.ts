import {V2} from 'paseto';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/constants';

const PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY!;
console.log(PUBLIC_KEY, "key");

export async function getUserFromToken() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME)?.value;
  console.log(token, "here");
  if (!token) return null;

  try {
    const key = Buffer.from(PUBLIC_KEY, 'base64'); 
    const payload = await V2.verify(token, key);
    console.log(payload);
    return payload;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
