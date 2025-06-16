"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { faqs, routes } from "../constants";
import { apiCall } from "@/utils/helper";
import { ClipLoader } from "react-spinners";

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
      const result = await apiCall("/api/findAccount", "POST", {
        email: trimmedEmail,
      });

      if (result?.data) {
        router.push(
          `${routes.LOGIN}?email=${encodeURIComponent(trimmedEmail)}`
        );
      } else {
        router.push(
          `${routes.SIGNUP}?email=${encodeURIComponent(trimmedEmail)}`
        );
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-white to-gray-800 text-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Rafiki</h1>
        <p className="text-xl md:text-4xl mb-6">
          The all-in-one platform to run your legal practice, online.
        </p>

        {/* Promo Message */}
        <p className="text-md md:text-lg text-gray-900 mb-10">
          Launch and manage your legal services seamlessly for just{" "}
          <span className="font-semibold">US$1/month</span>.<br />
          Commence your free trial today and benefit from three months of Rafiki
          at a nominal fee—tailored for growing practices.
        </p>

        {/* Search bar + Start Free Trial button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md border border-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            onClick={handleTrial}
            disabled={isLoading}
            className={`bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded shadow transition ${
              isLoading ? "cursor-disabled" : "cursor-pointer"
            }`}
          >
            {isLoading ? (
              <ClipLoader loading={isLoading} color="white" size={10} />
            ) : (
              "Start Free Trial"
            )}
          </button>
        </div>

        <p className="text-sm font-semibold text-gray-900 max-w-xl mx-auto">
          Try Rafiki free for 7 days — no credit card required. By entering your
          email, you agree to receive legal updates and product communications.
        </p>
      </div>

      {/* Features Section */}
      <div id="features" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Everything You Need to Run Your Firm
            </h2>
            <p className="text-gray-700 font-semibold mt-4 text-lg">
              Built for lawyers, by technologists who understand practice
              management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📄 Legal Services Catalog
              </h3>
              <p className="text-gray-700">
                List, price, and manage your legal services like a professional
                storefront.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                💳 Retainer & Payment Support
              </h3>
              <p className="text-gray-700">
                Accept cards, crypto, or bank payments—Rafiki handles billing,
                so you focus on cases.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📅 Client Intake & Scheduling
              </h3>
              <p className="text-gray-700">
                Let clients book you 24/7. Reduce no-shows, increase revenue,
                and stay in control.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-gray-700 mt-2 text-lg">
              Answers to common questions from legal professionals.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800 focus:outline-none cursor-pointer"
                >
                  {faq.question}
                  <span className="text-2xl ml-2">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <p className="mt-3 text-gray-700 text-base">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-b from-transparent to-gray-300 text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Rafiki. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Built with care for legal professionals worldwide.
          </p>
          <div className="mt-4 space-x-4">
            <Link
              href="#"
              className="text-sm hover:underline text-gray-700 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline text-gray-700 cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm hover:underline text-gray-700 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
