import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import ApiConfig from "@/services/api-config";
import { COOKIE_NAME, routes } from "@/constants";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil"
});

export async function POST(request: NextRequest) {
  const { url } = request;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const object = new URL(url);
  const { searchParams } = object;
  const firmId = searchParams.get("firmId");

  try {
    const account = await stripe.accounts.create({
      type: "express",
      metadata: {
        firmId
      }
    });

    await axios.post(
      ApiConfig.connectStripe,
      { stripeAccountId: account.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_FIRM_URL}${routes.SETTINGS}?tab=payment`,
      return_url: `${process.env.NEXT_PUBLIC_FIRM_URL}${routes.SETTINGS}?tab=payment`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url }); 
  } catch (error: any) {
    console.error(
      "Stripe Connect Error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Stripe onboarding failed" },
      { status: 500 }
    );
  }
}
