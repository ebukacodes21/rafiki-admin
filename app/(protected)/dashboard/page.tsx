"use client";
import React, { useEffect, useState } from "react";
import { selectCurrentUser } from "@/redux/features/auth";
import { selectCurrentFirm, setFirm } from "@/redux/features/firm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/useSelectorHook";
import { apiCall, formatError } from "@/utils/helper";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector(selectCurrentUser);
  const firm = useAppSelector(selectCurrentFirm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFirm = async () => {
      setLoading(true);
      const result = await apiCall("/api/get-firm", "GET");
      if (result.name === "AxiosError") {
        toast.error(formatError(result));
        setLoading(false);
        return;
      }
      dispatch(setFirm(result));
      setLoading(false);
    };
    getFirm();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-gray-700 text-sm">Hello, {admin?.fullName || "Admin"}</div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Firm Information</h2>
          <p><span className="font-medium">Name:</span> {firm?.name || "N/A"}</p>
          <p><span className="font-medium">Location:</span> {firm?.location || "N/A"}</p>
          <p><span className="font-medium">Founded:</span> {firm?.founded || "N/A"}</p>
          <p><span className="font-medium">Phone:</span> {firm?.phone || "N/A"}</p>
          <p><span className="font-medium">Email:</span> {firm?.email || "N/A"}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Admin</h2>
          <p><span className="font-medium">Name:</span> {admin?.fullName || "N/A"}</p>
          <p><span className="font-medium">Email:</span> {admin?.email || "N/A"}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Practice Areas</h2>
          {firm?.practiceAreas?.length ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {firm.practiceAreas.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          ) : (
            <p>No practice areas defined.</p>
          )}
        </div>
      </section>

      {firm?.billboard?.image && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Billboard</h2>
          <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
            <img
              src={firm.billboard.image}
              alt={firm.billboard.title || "Billboard"}
              className="w-full object-cover h-48 md:h-64"
              loading="lazy"
            />
            {firm.billboard.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 font-semibold text-lg">
                {firm.billboard.title}
              </div>
            )}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Additional Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p><span className="font-medium">Subscription Plan:</span> {firm?.subscriptionPlan || "N/A"}</p>
            <p><span className="font-medium">Live Firm URL:</span> <a href={firm?.liveFirm} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{firm?.liveFirm || "N/A"}</a></p>
            <p><span className="font-medium">QR Code:</span> {firm?.qrCode ? <a href={firm.qrCode} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View QR</a> : "N/A"}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p><span className="font-medium">Phone:</span> {firm?.phone || "N/A"}</p>
            <p><span className="font-medium">Email:</span> {firm?.email || "N/A"}</p>
            <p><span className="font-medium">Website:</span> {firm?.website || "N/A"}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;