import axios from 'axios';
import React from 'react'

const page = () => {
async function handler(req: any, res: any) {
  const { code } = req.query;

  const payload = {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.NEXT_PUBLIC_CALLBACK_CONNECT,
    grant_type: "authorization_code",
  };

  try {
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      payload,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, id_token } = data;

    // ✅ Save tokens in your DB securely, linked to the firm or user
    // Example:
    // await prisma.firm.update({ where: { id }, data: { gCalAccessToken: access_token, gCalRefreshToken: refresh_token } })

    res.redirect("/calendar/settings?connected=google");
  } catch (error) {
    console.error("Google OAuth callback error", error);
    res.status(500).send("OAuth callback failed");
  }
}

  return (
    <div>
      
    </div>
  )
}

export default page
