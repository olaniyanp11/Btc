"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000));

      setShowModal(true);
    } catch (err) {
      setError(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <h1 className="text-3xl md:text-6xl font-semibold text-white bg-primary py-16 text-center">
        Forgot Password
      </h1>
      <Image
        src="/images/image.svg"
        alt="icon"
        width={200}
        height={200}
        className="w-screen h-16 mt-[-20px] opacity-90"
      />
      <main className="py-9 flex items-center w-full bg-gray-50 px-4">
        <div className="w-full bg-white max-w-2xl mx-auto rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Username / Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-[150px] bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </div>
          </form>

          <div className="flex justify-between items-center mt-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              Already have an account?
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Check your inbox</h2>
            <p className="text-gray-600 mb-6">
              If an account with <span className="font-medium">{email}</span>{" "}
              exists, we’ve sent a password reset link.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
