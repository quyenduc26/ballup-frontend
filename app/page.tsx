"use client";
import { Button, Badge,Link } from "@heroui/react";
import { useRouter } from "next/navigation";



export default function App() {
  const router = useRouter();
  console.log(process.env.SECRET_KEY);

  return (
    <Badge className="bg-red-500 text-white" color="warning" content="5">
      <Button
        className="text-white bg-black font-medium rounded-none"
        onPress={() => router.push("/auth/sigUp")}
      >
        Button
      </Button>
       <Link href="/auth/login">Go to Login</Link>
    </Badge>
  );
}
