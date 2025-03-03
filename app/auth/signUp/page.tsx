"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/components/ToastMessage";
import { Button, Link } from "@heroui/react";
import { RegisterFormType } from "@/types";
import authApi from "@/service/authApi";
import Image from "next/image";
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
    const [toastData, setToastData] = useState<{ heading?: string; message?: string; type?: "error" | "success" | "info" | "warn"; duration?: number } | undefined>();

    const [formData, setFormData] = useState<RegisterFormType>({
        username: "",
        email: "",
        password: "",
        role: "",
    });

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        if (!formData.username.trim()) newErrors.username = "Please enter your name!";
        if (!formData.email.includes("@")) newErrors.email = "Email must contain'@'";
        if (!formData.password.match(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            newErrors.password = "Password must be 8 characters and numbers";
        }
        if (formData.password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match!";
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
            setToastData({ type: "success", heading: "Registration successful", message: "success!", duration: 3000 });
            setTimeout(() => router.push("/auth/login"), 3000);
        } catch (error: any) {
            setToastData({ type: "error", heading: "Registration failed", message: error.response?.data?.message || "An error occurred.!", duration: 4000 });
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithGoogle = async () => {
        window.location.href = "http://localhost:8080/auth/google";
    };




    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <ToastMessage toast={toastData} />
            <div className="relative w-full h-[500px] sm:h-[600px] md:h-full">
                <Image src={image} alt="Soccer player illustration" fill className="object-cover" priority />
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">BALLUP</div>
                <Image src={player} alt="Small Player" width={450} height={350} className="absolute top-1/3 left-3 transform -translate-y-1/2" />
            </div>

            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-4xl font-bold">Welcome back</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Enter your username"
                                className={`w-full p-2 rounded-md border ${errors.username ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email"
                                className={`w-full p-2 rounded-md border ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className={`w-full p-2 rounded-md border ${errors.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                                />
                                <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full p-2 rounded-md border ${errors.confirmPassword ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                                />
                                <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <select className="w-full p-2 border rounded-md text-sm" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                <option value="">Select your role</option>
                                <option value="user">Player</option>
                                <option value="owner">Owner</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
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

                    <Button onPress={handleLoginWithGoogle} className="w-full">
                        <Image src={google} alt="Google logo" width={20} height={20} className="mr-2" />
                        Sign in with Google
                    </Button>
                    <div className="mt-8 text-center">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <Link href="login" className="text-blue-500">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}