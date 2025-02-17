"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";
import { Button, Input } from "@heroui/react";
import { RegisterFormType } from "@/types";
import authApi from "@/service/authApi";

export default function SignUp() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<RegisterFormType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await authApi.signUp(formData);
            console.log("API Response:", response.data);

            alert("Sign-up successful!");
            router.push("/login"); 
        } catch (error: any) {
            console.error("Sign-up failed:", error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || "Sign-up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <div className="relative hidden md:block">
                <Image src={image} alt="Soccer player illustration" fill className="object-cover" priority />
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">
                    BALLUP
                </div>
                <Image src={player} alt="Small Player" width={450} height={350} className="absolute top-1/3 left-5 transform -translate-y-1/2" />
            </div>

            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-4xl font-bold">Welcome back</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <Input
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Enter your username"
                                type="text"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <Input
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <select
                                className="w-full p-2 border rounded-md text-sm"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                            >
                                <option value="">Select your role</option>
                                <option value="player">Player</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800"
                            disabled={loading}
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

                    <Button className="w-full">
                        <Image src={google} alt="Google logo" width={20} height={20} className="mr-2" />
                        Sign in with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
