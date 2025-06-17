import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; 
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getUserFromToken } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { routes } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafiki",
  description: "Your all in one suite for legal practitioners",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getUserFromToken()
  console.log(payload)
  return (
    <html lang="en">
      <head>
       <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        strategy="beforeInteractive"
      />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
