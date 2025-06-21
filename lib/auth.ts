"use server"
import { COOKIE_NAME } from '@/constants'
import { cookies } from 'next/headers'

export async function getAdminFirm() {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get(COOKIE_NAME)?.value
    if (!token) {
      throw new Error('unauthorized: no token found')
    }

    const res = await fetch(`${process.env.FIRM_API_URL}/firm/admin-firm-private`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store', 
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) 
    return data
  } catch (err) {
    console.error('error fetching admin firm', err)
    return null
  }
}
