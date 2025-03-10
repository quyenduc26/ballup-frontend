"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Input, Link } from "@heroui/react";
import Image from "next/image";

import { SonnerToast } from "@/components/sonnerMesage";
import { RegisterFormType } from "@/types";
import authApi from "@/service/authApi";
import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();

  const [formData, setFormData] = useState<RegisterFormType>({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!formData.username.trim())
      newErrors.username = "Please enter your name!";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email!";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain '@'";
    }
    if (!formData.password.match(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      newErrors.password = "Password must be 8 characters and numbers!";
    }
    if (formData.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";
    if (!formData.role) newErrors.role = "Please select role!";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authApi.signUp(formData);

      setToastData({
        type: "success", // Không cần thay đổi
        heading: "Registration successful",
        message: "success!",
        duration: 3000,
      });
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (error: any) {
      setToastData({
        type: "error", // Không cần thay đổi
        heading: "Registration failed",
        message: error.response?.data?.message || "An error occurred.!",
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
      <div>
        <SonnerToast toast={toastData} />
      </div>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
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
            <h1 className="text-4xl font-bold">Welcome back</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div className="space-y-2">
                <Input
                  className={`w-full p-2 rounded-md  ${errors.username ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Enter your username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Input
                  className={`w-full p-2 rounded-md  ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email"
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    className={`w-full p-2 rounded-md  ${errors.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
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
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    className={`w-full p-2 rounded-md  ${errors.confirmPassword ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                    label="Confirm Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="role">
                  Role
                </label>
                <select
                  className="w-full p-2 border rounded-md  text-sm"
                  id="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="">Select your role</option>
                  <option value="user">Player</option>
                  <option value="owner">Owner</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div>

              <Button
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={loading}
                type="submit"
              >
                {loading ? "Signing up..." : "Sign up"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
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
            <div className="mt-8 text-center">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link className="text-blue-500" href="login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
