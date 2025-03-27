"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { SonnerToast } from "../sonnerMesage";

import { CreateTeamData } from "@/types/form";
import createTeamApi from "@/service/createTeamApi";
import { uploadImage } from "@/utils/uploadImage";
import { getImageUrl } from "@/utils/getImage";

const CreateTeam = ({ setIsOpen }: { setIsOpen: () => void }) => {
  const [formData, setFormData] = useState<CreateTeamData>({
    cover: "",
    logo: "",
    name: "",
    address: "",
    intro: "",
    sport: "",
    userId: 1,
  });

  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    undefined,
  );
  const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState({
    cover: false,
    logo: false,
    name: false,
    address: false,
    intro: false,
    sport: false,
  });
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleChangeSport = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "FOOTBALL" | "BADMINTON" | "";

    setFormData({ ...formData, sport: value });
    if (value) {
      setErrors((prev) => ({ ...prev, sport: false }));
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "logo",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        setToastData({
          type: "error",
          heading: "File Too Large ❗",
          message: "Image size should not exceed 5MB",
          duration: 3000,
        });

        return;
      }

      const filename = await uploadImage(file);

      if (filename) {
        const imageUrl = getImageUrl(filename);

        if (type === "cover") {
          setFormData({ ...formData, cover: filename });
          setCoverPreview(imageUrl);
          setErrors((prev) => ({ ...prev, cover: false }));
        } else {
          setFormData({ ...formData, logo: filename });
          setLogoPreview(imageUrl);
          setErrors((prev) => ({ ...prev, logo: false }));
        }
      }
    }
  };

  const handleRemoveImage = (type: "cover" | "logo") => {
    if (type === "cover") {
      setFormData({ ...formData, cover: "" });
      setCoverPreview(undefined);
    } else {
      setFormData({ ...formData, logo: "" });
      setLogoPreview(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      cover: !formData.cover,
      logo: !formData.logo,
      name: !formData.name.trim(),
      address: !formData.address.trim(),
      intro: !formData.intro.trim(),
      sport: !formData.sport,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setToastData({
        type: "error",
        heading: "Validation Error ❗",
        message: "Please fill in all required fields!",
        duration: 3000,
      });

      return;
    }

    try {
      const response = await createTeamApi.createTeam(formData);

      if (response) {
        setToastData({
          type: "success",
          heading: "Success 🎉",
          message: "Team created successfully!",
          duration: 3000,
        });

        setTimeout(() => {
          setIsOpen()
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      setToastData({
        type: "error",
        heading: "Error ❗",
        message: "An error occurred, please try again!",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      cover: "",
      logo: "",
      name: "",
      address: "",
      intro: "",
      sport: "",
      userId: 1,
    });
    setCoverPreview(undefined);
    setLogoPreview(undefined);
    setErrors({
      cover: false,
      logo: false,
      name: false,
      address: false,
      intro: false,
      sport: false,
    });
    // Đóng form bằng cách gọi setIsOpen
    setIsOpen();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
      <SonnerToast toast={toastData} />

      <button
        className="flex items-center px-4 py-2 mb-4 bg-black text-white rounded"
        onClick={setIsOpen}
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">CREATE TEAM</h2>

      <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
        {coverPreview ? (
          <>
            <img
              alt="Cover Preview"
              className="object-cover w-full h-full"
              src={coverPreview}
            />
            <button
              className="absolute top-2 right-2 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("cover")}
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-xl">
              <Upload className="text-gray-500 mr-2" size={24} />
              <span>Upload Cover</span>
            </div>
            <input
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={(e) => handleImageUpload(e, "cover")}
            />
          </>
        )}

        <div className="absolute top-1/3 w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 flex items-center justify-center overflow-hidden mr-96">
          {logoPreview ? (
            <>
              <img
                alt="Logo Preview"
                className="w-full h-full object-cover"
                src={logoPreview}
              />
              <button
                className="absolute top-1 right-1 text-white w-6 h-6 flex items-center justify-center bg-red-500"
                onClick={() => handleRemoveImage("logo")}
              >
                ❌
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center text-gray-400 text-lg">
                <Upload className="text-gray-500 mr-2" size={24} />
                <span>Upload Logo</span>
              </div>
              <input
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                onChange={(e) => handleImageUpload(e, "logo")}
              />
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4 mt-14">
          <div>
            <label className="text-sm font-semibold" htmlFor="name">
              TEAM NAME <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a team name
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="address">
              ADDRESS <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full p-2 border rounded ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                Please enter an address
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold" htmlFor="overview">
            TEAM OVERVIEW <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full p-2 border rounded ${
              errors.intro ? "border-red-500" : "border-gray-300"
            }`}
            id="overview"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
          />
          {errors.intro && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a team overview
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="sport">
            SPORT <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full p-2 border rounded h-10 ${
              errors.sport ? "border-red-500" : "border-gray-300"
            }`}
            id="sport"
            value={formData.sport || ""}
            onChange={handleChangeSport}
          >
            <option disabled value="">
              Type Of Sport
            </option>
            <option value="FOOTBALL">Football</option>
            <option value="BADMINTON">Badminton</option>
          </select>
          {errors.sport && (
            <p className="text-red-500 text-sm mt-1">Please select a sport</p>
          )}
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
            type="submit"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
