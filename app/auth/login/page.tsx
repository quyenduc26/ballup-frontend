"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";
import { Button, Input, Link } from "@heroui/react";
import { LoginFormType } from "@/types";
import authApi from "@/service/authApi";
import { ToastMessage } from "@/components/ToastMessage";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastData, setToastData] = useState<{ heading?: string; message?: string; type?: "error" | "success" | "info" | "warn"; duration?: number } | undefined>();
    const [role, setRole] = useState<string | null>(null);

    const [formData, setFormData] = useState<LoginFormType>({
        emailOrUsername: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            setLoading(true);
            const response = await authApi.login(formData);

            if (response.data) {
                const token = response.data;
                const role = response.data.role;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                await fetch("http://localhost:8080/auth/test/current-user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("    User Data:", data);
                        if (data.authorities && data.authorities.length > 0) {
                            setRole(data.authorities[0]);
                            localStorage.setItem("role", data.authorities[0]);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching current user:", error);
                    });
            }


            setToastData({
                type: "success",
                heading: "Login Successful",
                message: "You have successfully logged in!",
                duration: 3000,
            });

            if (role === "admin") {
                router.push("/admin");
            } else if (role === "ROLE_OWNER") {
                router.push("/owner");
            } else {
                router.push("/owner");
            }

        } catch (error: any) {
            console.error("Login failed:", error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleLoginWithGoogle = async () => {
        window.location.href = "http://localhost:8080/auth/google";
    }

    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <ToastMessage toast={toastData} />
            <div className="relative w-full h-[500px] sm:h-[600px] md:h-full">
                <Image src={image} alt="Soccer player illustration" fill className="object-cover" priority />
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">
                    BALLUP
                </div>
                <Image src={player} alt="Small Player" width={450} height={350} className="absolute top-1/3 left-3 transform -translate-y-1/2" />
            </div>



            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-4xl font-bold">Welcome</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                value={formData.emailOrUsername}
                                onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <Input
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button type="submit" disabled={loading} className="w-full bg-black text-white hover:bg-gray-800">
                                {loading ? "Logging in..." : "Log In"}
                            </Button>
                        </div>
                        <Button onPress={handleLoginWithGoogle} className="w-full">
                            <Image src={google} alt="Google logo" width={20} height={20} className="mr-2" />
                            Sign in with Google
                        </Button>
                        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <Link href="/auth/signUp" className="text-blue-500">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
