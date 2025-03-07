"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Link } from "@heroui/react";

import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";
import { LoginFormType } from "@/types";
import authApi from "@/service/authApi";
import { SonnerToast } from "@/components/sonnerMesage";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState<
    | {
      heading?: string;
      message?: string;
      type?: "error" | "success" | "info" | "warn";
      duration?: number;
    }
    | undefined
  >();
  const [formData, setFormData] = useState<LoginFormType>({
    emailOrUsername: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    if (/\s/.test(email)) {
      return "Invalid email format";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Invalid email";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailError = validateEmail(formData.emailOrUsername);

    if (emailError) {
      setErrorMessage(emailError);

      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(formData);
      const data = response.data;

      if (data) {
        localStorage.setItem("data", JSON.stringify(data));
      }
      setToastData({
        type: "success",
        heading: "Login Successful",
        message: "You have successfully logged in!",
        duration: 3000,
      });
      router.push("/");
    } catch (error: any) {
      const errorResponse = error.response?.data?.message;

      if (errorResponse) {
        if (errorResponse.includes("Invalid email")) {
          setErrorMessage("Email not found");
        } else if (errorResponse.includes("Incorrect password")) {
          setErrorMessage("Incorrect password");
        } else if (errorResponse.includes("Invalid credentials")) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage(errorResponse);
        }
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
    <div>
      
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="relative w-full h-[500px] sm:h-[600px] md:h-full">
          <Image
            fill
            priority
            alt="Soccer player illustration"
            className="object-cover"
            src={image}
          />
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">
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
                  required
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.emailOrUsername}
                  onChange={(e) =>
                    setFormData({ ...formData, emailOrUsername: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 ">
                <div className="relative">
                  <Input
                    required
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
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link className="text-blue-500" href="signup">
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
