"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </main>
  );
}
