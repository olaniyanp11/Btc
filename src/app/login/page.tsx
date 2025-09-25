"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxEyeOpen,RxEyeClosed } from "react-icons/rx";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // load saved email if remembered
  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const validate = () => {
    if (!email) return "Please enter your email.";
    // simple email regex
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email.";
    if (!password) return "Please enter your password.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    try {
      // Remember me logic (store email only)
      if (remember) localStorage.setItem("rememberedEmail", email);
      else localStorage.removeItem("rememberedEmail");

      // TODO: replace with real API call
      // Example:
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })
      // if (!res.ok) throw new Error("Invalid credentials");

      // Simulated success
      await new Promise((r) => setTimeout(r, 700));
      // redirect on success (adjust path to your app)
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <h1 className="text-3xl md:text-6xl font-semibold text-white bg-primary py-16 text-center">
        Log in
      </h1>
      <Image
        src={"/images/image.svg"}
        alt="icon"
        width={200}
        height={200}
        className="w-screen h-16 mt-[-20px] opacity-90"
      />
      <main className="py-9 flex items-center w-full bg-gray-50 px-4">
        <div className="w-full max-w-full bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 px-2 py-1 rounded"
                >
                  {showPassword ? <RxEyeOpen/> :<RxEyeClosed/> }
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => router.push("/auth/forgot-password")}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-[100px] bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
