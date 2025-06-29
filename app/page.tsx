"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { faqs, routes } from "@/constants";
import { apiCall } from "@/utils/helper";
import { ClipLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleTrial = async () => {
    setIsLoading(true);
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      router.push(routes.ACCOUNTS);
      return;
    }

    try {
      const result = await apiCall("/api/find-account", "POST", {
        email: trimmedEmail,
      });

      if (result?.data) {
        router.push(`${routes.LOGIN}?email=${encodeURIComponent(trimmedEmail)}`);
      } else {
        router.push(`${routes.SIGNUP}?email=${encodeURIComponent(trimmedEmail)}`);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-800 to-black text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Rafiki</h1>
        <p className="text-xl md:text-4xl mb-6 text-gray-300">
          The all-in-one platform to run your legal practice, online.
        </p>

        <p className="text-md md:text-lg text-gray-400 mb-10">
          Launch and manage your legal services seamlessly for just{" "}
          <span className="font-semibold">US$1/month</span>.<br />
          Commence your free trial today and benefit from three months of Rafiki
          at a nominal fee—tailored for growing practices.
        </p>

        {/* Email input + Start button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto mb-6">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md border border-gray-700 bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button
            onClick={handleTrial}
            disabled={isLoading}
            className={`bg-white text-black font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition ${
              isLoading ? "cursor-disabled" : "cursor-pointer"
            }`}
          >
            {isLoading ? (
              <ClipLoader loading={isLoading} color="black" size={12} />
            ) : (
              "Start Free Trial"
            )}
          </Button>
        </div>

        <p className="text-sm font-semibold text-gray-500 max-w-xl mx-auto">
          Try Rafiki free for 7 days — no credit card required. By entering your
          email, you agree to receive legal updates and product communications.
        </p>
      </div>

      {/* Features Section */}
      <div id="features" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Everything You Need to Run Your Firm
            </h2>
            <p className="text-gray-400 font-semibold mt-4 text-lg">
               Built for lawyers, by technologists who understand practice
              management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                📄 Legal Services Catalog
              </h3>
              <p>Showcase and organize your legal services with clarity and confidence.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                💳 Retainer & Payments
              </h3>
              <p>Accept cards, crypto, or bank payments. Rafiki handles billing,
                so you focus on cases.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                📅 Scheduling & Intake
              </h3>
              <p>Let clients book you 24/7. Reduce no-shows, increase revenue,
                and stay in control.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">FAQs</h2>
            <p className="text-gray-400 mt-2 text-lg">
              Answers for legal professionals getting started on Rafiki.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center text-lg font-medium text-white focus:outline-none cursor-pointer"
                >
                  {faq.question}
                  <span className="text-2xl ml-2">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <p className="mt-3 text-gray-400 text-base">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-gray-500 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Rafiki. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with care for African and global law practices.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
