"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import TeamDetailApi from "@/service/teamDetail";
import { uploadImage } from "@/utils/uploadImage";
import { getImageUrl } from "@/utils/getImage";
import { SonnerToast } from "@/components/sonnerMesage";

export default function UpdateTeamDetail({
  teamId: propTeamId,
  onClose: propOnClose,
}: {
  teamId?: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [teamId, setTeamId] = useState(propTeamId || null);
  const [loading, setLoading] = useState(false);
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
    intro: "",
    address: "",
    sport: "",
    cover: "",
    logo: "",
  });

  const [coverPreview, setCoverPreview] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async ({
    e,
    type,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    type: string;
  }) => {
    const file = e?.target.files?.[0];

    if (file) {
      const imageUrl = await uploadImage(file);

      if (!imageUrl) {
        alert("Failed to upload image.");

        return;
      }
      const imgSrc = getImageUrl(imageUrl);

      if (!imgSrc) return;
      if (type === "cover") {
        setCoverPreview(imgSrc);
        setFormData({ ...formData, cover: imageUrl });
      } else {
        setLogoPreview(imgSrc);
        setFormData({ ...formData, logo: imageUrl });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamId) {
      setToastData({
        message: "No team ID available. Cannot update.",
        type: "error",
      });

      return;
    }
    setLoading(true);
    try {
      await TeamDetailApi.updateTeam(parseInt(teamId), formData);
      setToastData({
        type: "success",
        heading: "Team updated successfully",
        message: "",
        duration: 3000,
      });

      setTimeout(() => {
        setLoading(false);
        if (propOnClose) {
          propOnClose();
        } else {
          router.push("/team");
        }
      }, 3200);
    } catch (error: any) {
      setToastData({
        type: "error",
        heading: "Team update failed",
        message: error.response?.data?.message || "An error occurred!",
        duration: 4000,
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
      <SonnerToast toast={toastData} />
      <h2 className="text-2xl font-bold text-center mb-4">UPDATE TEAM</h2>

      {/* Upload Cover */}
      <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
        {coverPreview ? (
          <>
            <img
              alt="Cover Preview"
              className="object-cover w-full h-full"
              src={coverPreview}
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => setCoverPreview("")}
            >
              ✖
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-xl">
              <span>Upload Cover</span>
            </div>
            <input
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={(e) => handleImageUpload({ e, type: "cover" })}
            />
          </>
        )}
      </div>

      {/* Upload Logo */}
      <div className="relative w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md mx-auto mb-4 overflow-hidden">
        {logoPreview ? (
          <>
            <img
              alt="Logo Preview"
              className="object-cover w-full h-full"
              src={logoPreview}
            />
            <button
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md"
              onClick={() => setLogoPreview("")}
            >
              ✖
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-lg">
              <span>Upload Logo</span>
            </div>
            <input
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={(e) => handleImageUpload({ e, type: "logo" })}
            />
          </>
        )}
      </div>

      {/* Form nhập thông tin */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold" htmlFor="name">
              TEAM NAME
            </label>
            <input
              className="w-full p-2 border rounded"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="address">
              ADDRESS
            </label>
            <input
              className="w-full p-2 border rounded"
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold" htmlFor="intro">
            TEAM OVERVIEW
          </label>
          <textarea
            className="w-full p-2 border rounded"
            id="intro"
            name="intro"
            value={formData.intro}
            onChange={handleChangeTextArea}
          />
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="sport">
            SPORT
          </label>
          <select
            className="w-full p-2 border rounded h-10"
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChangeSelect}
          >
            <option value="">Type Of Sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BADMINTON">Badminton</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 border rounded"
            type="button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            disabled={loading}
            type="submit"
          >
            {loading}
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}
