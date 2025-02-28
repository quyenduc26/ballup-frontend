"use client";

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-8">
        <h2 className="text-sm uppercase text-gray-600 font-medium">CONTACT US</h2>
        <h1 className="text-5xl font-bold mt-2 mb-8">SEND A MAIL</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">HOW CAN WE CALLED YOU?</label>
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
                placeholder="Enter you message"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">WHAT YOU WANT TO TELL US?</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter you message"
              className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-gray-400 h-40"
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black text-white px-12 py-4 font-medium hover:bg-gray-800 transition duration-300"
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