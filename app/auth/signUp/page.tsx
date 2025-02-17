"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import image from "@/public/images/image 3.png";
import player from "@/public/images/player.png";
import google from "@/public/images/google.png";

import { Button, Input } from "@heroui/react";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            {/* Left Section - Hero Image */}
            <div className="relative hidden md:block">
                <Image
                    src={image}
                    alt="Soccer player illustration"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white font-bold text-6xl">
                    BALLUP
                </div>

                <Image
                    src={player}
                    alt="Small Player"
                    width={450}
                    height={350}
                    className="absolute top-1/3 left-5 transform -translate-y-1/2"
                />
            </div>

            {/* Right Section - Sign Up Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <h1 className="text-4xl font-bold">Welcome back</h1>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <Input placeholder="Enter your username" type="text" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input placeholder="Enter your email" type="text" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" required />
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
                            <label htmlFor="confirm-password" className="text-sm font-medium">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
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

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <select className="w-full p-2 border rounded-md text-sm">
                                    <option value="">Select your role</option>
                                    <option value="player">Player</option>
                                    <option value="owner">Owner</option>
                                </select>
                            </div>
                        </div>

                        <Button className="w-full bg-black text-white hover:bg-gray-800">Sign up</Button>

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
        </div>
    )
}


