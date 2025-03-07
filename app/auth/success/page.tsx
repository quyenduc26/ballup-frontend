"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("data", JSON.stringify({ token: token }));
      router.replace("/");
    }
  }, []);

  return <p />;
}
