"use client";
import { Button, Badge } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  return (
    <Badge className="bg-red-500 text-white" color="warning" content="5">
      <Button
        className="text-white bg-black font-medium rounded-none"
        onPress={() => router.push("/auth/signUp")}
      >
        Button
      </Button>
    </Badge>
  );
}
