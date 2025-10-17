"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/AuthContext";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // 🚫 If there's no user in the bowl, redirect to login
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // 💧 Wait for user to load or redirect
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  // ✅ If user exists, show the page content
  return children;
}
