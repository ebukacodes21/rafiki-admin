"use client";

// import FirmHeader from "./components/firmHeader";
// import ServiceCard from "./components/serviceCard";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import { FaEye, FaMobileAlt, FaDesktop, FaPaintBrush } from "react-icons/fa";

const OnlineFirmEditor = () => {
  // const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
    <Button className="">
      View Online Firm
    </Button>
    </div>
  );
};

export default OnlineFirmEditor;

// app/firms/[slug]/page.tsx


// export default function FirmPage({ params }: { params: { slug: string } }) {
//   // Mocked firm data
//   const firm = {
//     name: "Jackson Legal Group",
//     slug: params.slug,
//     logo: "https://via.placeholder.com/64x64.png?text=JLG",
//     description: "We specialize in immigration and family law. Helping clients with compassion and clarity since 2010.",
//     services: [
//       {
//         title: "Green Card Application",
//         price: "$299",
//         description: "Flat-fee service to handle your entire green card process.",
//       },
//       {
//         title: "Uncontested Divorce",
//         price: "$399",
//         description: "Quick and affordable divorce filings with expert guidance.",
//       },
//       {
//         title: "Work Visa Assistance",
//         price: "$250",
//         description: "Full support for obtaining temporary or permanent work authorization.",
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//    {/* Top of the page */}
// <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16">
//   <div className="max-w-5xl mx-auto px-6 text-center">
//     <h1 className="text-4xl font-bold mb-4">Jackson Legal Group</h1>
//     <p className="text-lg max-w-2xl mx-auto">
//       Trusted by over 500 families since 2010. Specializing in immigration & family law.
//     </p>
//     <div className="mt-6">
//       <button className="bg-white text-blue-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-100">
//         Book Free Consultation
//       </button>
//     </div>
//   </div>
// </section>


//      <section className="py-12 bg-white">
//   <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center">
//     <img src="/lawyer-photo.jpg" alt="Attorney" className="w-full md:w-1/2 rounded-lg shadow" />
//     <div className="md:ml-8 mt-6 md:mt-0">
//       <h2 className="text-2xl font-bold mb-2">Meet Attorney Carla Jackson</h2>
//       <p className="text-gray-600">
//         With over 14 years of experience in immigration law, Carla helps families reunite and build new futures in the U.S.
//       </p>
//     </div>
//   </div>
// </section>

// <section className="py-12 bg-gray-50">
//   <div className="max-w-4xl mx-auto px-6 text-center">
//     <h3 className="text-xl font-semibold mb-6">What Clients Say</h3>
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//       <blockquote className="bg-white p-6 rounded shadow">
//         “Carla made the green card process stress-free. Highly recommend!”
//         <footer className="mt-4 text-sm text-gray-500">– Ana R.</footer>
//       </blockquote>
//       <blockquote className="bg-white p-6 rounded shadow">
//         “Efficient, professional, and caring. The best legal service I’ve had.”
//         <footer className="mt-4 text-sm text-gray-500">– Jamil O.</footer>
//       </blockquote>
//     </div>
//   </div>
// </section>

// <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-200">
//   Get Started
// </button>

//     </div>
//   );
// }
