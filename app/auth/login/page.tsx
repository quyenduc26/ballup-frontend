"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Link } from "@heroui/react";

import { SonnerToast } from "@/components/sonnerMesage";
import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";
import { LoginFormType } from "@/types";
import authApi from "@/service/authApi";
import { useUser } from "@/context/UserContext";

export default function Login() {
  const { setUserId } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();
  const [formData, setFormData] = useState<LoginFormType>({
    emailOrUsername: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    if (/\s/.test(email)) return "Invalid email format";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email) ? null : "Invalid email";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(formData.emailOrUsername);

    if (emailError) {
      setToastData({
        type: "error",
        heading: "Validation Error",
        message: emailError,
        duration: 3000,
      });

      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(formData);

      console.log("Login response:", response);

      if (response.data) {
        const { id, role } = response.data;

        localStorage.setItem("data", JSON.stringify(response.data));
        setUserId(id);

        setToastData({
          type: "success",
          heading: "Login Successful",
          message: "You have successfully logged in!",
          duration: 3000,
        });

        // Chuyển hướng dựa trên role
        let redirectPath = "/";

        if (role === "OWNER") {
          redirectPath = "/owner";
        } else if (role === "admin") {
          redirectPath = "/admin";
        }

        router.push(redirectPath); // 👉 Chuyển hướng trước

        setTimeout(() => {
          window.location.reload(); // 👉 Reload sau khi chuyển trang
        }, 600); // Đợi 0.4s để `router.push` hoạt động trước
      }
    } catch (error: any) {
      let message = "Login failed. Please try again.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      setToastData({
        type: "error",
        heading: "Login Failed",
        message: message,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div>
      <SonnerToast toast={toastData} />
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 mt-10">
        <div className="relative w-full h-[650px] sm:h-[650px] md:h-full">
          <Image
            fill
            priority
            alt="Soccer player illustration"
            className="object-cover"
            src={image}
          />
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">
            BALLUP
          </div>
          <Image
            alt="Small Player"
            className="absolute top-1/3 left-3 transform -translate-y-1/2"
            height={350}
            src={player}
            width={450}
          />
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-4xl font-bold mb-10">Welcome</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2 mb-12">
                <Input
                  id="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.emailOrUsername}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailOrUsername: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2 ">
                <div className="relative">
                  <Input
                    id="password"
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <Button className="w-full" disabled={loading} type="submit">
                  {loading ? "Logging in..." : "Log In"}
                </Button>
              </div>
              <Button className="w-full" onPress={handleLoginWithGoogle}>
                <Image
                  alt="Google logo"
                  className="mr-2"
                  height={20}
                  src={google}
                  width={20}
                />
                Sign in with Google
              </Button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link className="text-blue-500" href="signUp">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
