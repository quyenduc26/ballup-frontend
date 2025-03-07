"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import playingApi from "@/service/playingApi";
import { PlayingSlotType } from "@/types";

const PlayingSlot = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PlayingSlotType>({
    name: "",
    primaryPrice: 0,
    nightPrice: 0,
    playingCenterId: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await playingApi.createPlayingSlot(formData);

      alert("Playing Slot created successfully!");
      router.push("/success-page");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create Playing Slot. Please try again.");
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-center font-bold text-lg">CREATE PLAYING SLOT</h2>
      <button
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
      </button>
      <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        {/* Input tên */}
        <Input
          isRequired
          className="p-2 w-full"
          errorMessage="Please enter a valid name"
          label="NAME"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
          type="text"
          value={formData.name}
          onChange={handleChangeName}
        />

        {/* Input Primary Price */}
        <Input
          isRequired
          className="p-2 w-full"
          errorMessage="Please enter a valid primary price"
          label="PRIMARY PRICE"
          labelPlacement="outside"
          name="primaryPrice"
          placeholder="Enter primary price"
          type="number"
          value={formData.primaryPrice.toString()}
          onChange={handleChange}
        />

        {/* Input Night Price */}
        <Input
          isRequired
          className="p-2 w-full"
          errorMessage="Please enter a valid night price"
          label="NIGHT PRICE"
          labelPlacement="outside"
          name="nightPrice"
          placeholder="Enter night price"
          type="number"
          value={formData.nightPrice.toString()}
          onChange={handleChange}
        />

        {/* Nút Submit */}
        <button
          className="bg-orange-400 h-12 text-white px-4 py-2 rounded mt-4"
          type="submit"
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default PlayingSlot;
