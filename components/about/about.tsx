"use client";

import React, { useState } from "react";

import { SonnerToast } from "../sonnerMesage";

import feedbackApi from "@/service/contactFormApi";

const ContactForm = () => {
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
          heading: "Submission Failed ",
          message: "Failed to send your feedback. Please try again!",
          duration: 3000,
        });
      } else {
        setToastData({
          type: "success",
          heading: "Submission Successful",
          message: "Your feedback has been sent successfully!",
          duration: 3000,
        });

        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          content: "",
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

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      {/* Toast Message */}
      <SonnerToast toast={toastData} />

      <div className="mb-8">
        <h2 className="text-sm uppercase text-gray-600 font-medium">
          CONTACT US
        </h2>
        <h1 className="text-5xl font-bold mt-2 mb-8">SEND A MAIL</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                HOW CAN WE CALL YOU?
              </label>
              <input
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                WHAT IS YOUR EMAIL?
              </label>
              <input
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Content (Textarea) */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="content">
              WHAT DO YOU WANT TO TELL US?
            </label>
            <textarea
              className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400 h-40"
              id="content"
              name="content"
              placeholder="Enter your message"
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center flex-col items-center">
            <button
              className="bg-black text-white px-12 py-4 font-medium hover:bg-gray-800 transition duration-300"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
