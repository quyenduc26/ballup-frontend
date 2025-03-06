"use client";

import React, { useEffect, useState } from "react";
import { ToastMessage } from "../ToastMessage";
import feedbackApi from "@/service/contactFormApi";
import { ToastType } from "@/types/common";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });

    const [toastData, setToastData] = useState<ToastType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log("Form data before submission:", formData);
            const response = await feedbackApi.PostFeedbackApi(formData);

            console.log("Full API Response:", response);
            console.log("API Response Data:", response?.data);

            if (response?.data?.message) {
                setToastData({
                    type: "error",
                    heading: "Submission Failed ❌",
                    message: "Failed to send your feedback. Please try again!",
                    duration: 3000,
                });
               
            } else {

                setToastData({
                    type: "success",
                    heading: "Submission Successful 🎉",
                    message: "Your feedback has been sent successfully!",
                    duration: 3000,
                });
            }
        } catch (error: unknown) {
            setToastData({
                type: "error",
                heading: "Error ❗",
                message: "Something went wrong. Please try again later!",
                duration: 3000,
            });
        }
    };

    // Tự động ẩn toast sau thời gian duration
    useEffect(() => {
        if (toastData) {
            const timer = setTimeout(() => setToastData(null), toastData.duration);
            return () => clearTimeout(timer);
        }
    }, [toastData]);

    return (
        <div className="max-w-5xl mx-auto py-16 px-4">
            {toastData && <ToastMessage toast={toastData} />}

            <div className="mb-8">
                <h2 className="text-sm uppercase text-gray-600 font-medium">CONTACT US</h2>
                <h1 className="text-5xl font-bold mt-2 mb-8">SEND A MAIL</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">HOW CAN WE CALL YOU?</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">WHAT IS YOUR EMAIL?</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">WHAT DO YOU WANT TO TELL US?</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400 h-40"
                        />
                    </div>

                    <div className="flex justify-center flex-col items-center">
                        <button
                            type="submit"
                            className="bg-black text-white px-12 py-4 font-medium hover:bg-gray-800 transition duration-300"
                        >
                            SUBMIT
                        </button>

                        {toastData?.type === "success" && (
                            <p className="text-green-600 font-medium mt-4">✅ Feedback submitted successfully!</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
