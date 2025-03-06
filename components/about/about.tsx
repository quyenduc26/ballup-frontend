"use client";

import React, { useEffect, useState } from "react";
import { ToastMessage } from "../ToastMessage";
import feedbackApi from "@/service/contactFormApi";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        content: "",
    });

    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await feedbackApi.GetFeedbackApi();
                console.log("API Response:", response.data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchData();
    }, []);

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
                setToast({ type: "success", message: "🎉 Feedback submitted successfully!" });

                console.log("🎉 Feedback submitted successfully!");

                setFormData({ name: "", email: "", content: "" });
            } else {
                setToast({ type: "error", message: "API error: " + (response?.data?.message || "No error details available") });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setToast({ type: "error", message: "Error submitting form: " + (error.message || "Unknown error") });
            } else {
                setToast({ type: "error", message: "Error submitting form: Unknown error" });
            }
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="max-w-5xl mx-auto py-16 px-4">
            {toast && <ToastMessage type={toast.type} message={toast.message} />}

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

                        {toast?.type === "success" && (
                            <p className="text-green-600 font-medium mt-4">✅ Feedback submitted successfully!</p>
                        )}
                    </div>
                    {toast && (
                        <div className="fixed top-5 right-5 bg-white shadow-lg border-l-4 p-4 rounded-lg z-50 transition-opacity duration-500 ease-in-out"
                            style={{
                                borderColor: toast.type === "success" ? "green" : "red",
                            }}
                        >
                            <p className={`font-medium ${toast.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                {toast.message}
                            </p>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
};
export default ContactForm;