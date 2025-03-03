"use client";
import IntroHomePage from "@/components/intro/page";
import { useRouter } from "next/navigation";



export default function App() {
  const router = useRouter();
  console.log(process.env.SECRET_KEY);

  return (
    <IntroHomePage />
  );
}
