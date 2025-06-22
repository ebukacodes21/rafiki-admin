import Navbar from "@/components/navbar";
import { COOKIE_NAME } from "@/constants";
import ReduxInitializer from "@/redux/hooks/initializer";
import { Firm } from "@/types/types";
import { cookies } from "next/headers";

async function getFirm(): Promise<Firm | null> {
  const baseUrl = process.env.RAFIKI_FIRM_API_URL;
  if (!baseUrl) throw new Error("missing firm api url");

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const res = await fetch(`${baseUrl}/firm/private`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Failed to fetch firm:", res.status, body);
    return null;
  }

  return res.json();
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const firm = await getFirm();

  if (!firm) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Firm not found.</p>
      </main>
    );
  }

  return (
    <>
      <ReduxInitializer firm={firm} />
      <Navbar />
      {children}
    </>
  );
}
