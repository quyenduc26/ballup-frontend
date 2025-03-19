"use client";
import { useState, useEffect, type FormEvent } from "react";
import type React from "react";
import { X } from "lucide-react";
import { Button } from "@heroui/react";
import { toast, Toaster } from "sonner";
import type { PlayingCenterEditType } from "@/types/form";
import playingApi from "@/service/playingApi";
import { getImageUrl } from "@/utils/getImage";
import { uploadImage } from "@/utils/uploadImage";

type EditCenterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  centerId: number;
  onSuccess: () => void;
};

const EditCenterModal: React.FC<EditCenterModalProps> = ({
  isOpen,
  onClose,
  centerId,
  onSuccess,
}) => {
  console.log("EditCenterModal rendered with props:", { isOpen, centerId });

  const [formData, setFormData] = useState<PlayingCenterEditType>({
    name: "",
    address: "",
    description: "",
    imageUrls: [],
    ownerId: 0,
    centerType: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCenterDetails = async () => {
      if (!isOpen || !centerId) {
        console.log("Modal not open or invalid centerId:", { isOpen, centerId });
        return;
      }
      console.log("Fetching center details for ID:", centerId);
      try {
        setLoading(true);
        const response = await playingApi.getCenterInfor(centerId);
        console.log("Received center data:", response.data);
        setFormData({
          ...response.data,
          images: response.data.images || [], // Đảm bảo images không bị undefined
        });
      } catch (error) {
        console.error("Error fetching center details:", error);
        toast.error("Failed to load center details", {
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCenterDetails();
  }, [isOpen, centerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const filename = await uploadImage(file);
        if (filename) {
          const updatedImages = [...formData.imageUrls];
          updatedImages[index] = filename;
          setFormData((prev) => ({
            ...prev,
            imageUrls: updatedImages,
          }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image", {
          duration: 3000,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.centerType) {
      toast.error("Please fill in all required fields", {
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        description: formData.description.trim(),
        ownerId: formData.ownerId,
        type: formData.centerType,  
        images: formData.imageUrls.filter((img) => img !== null && img !== ""),
      };
      const response = await playingApi.updateCenter(centerId, payload);
      console.log("API Response:", response);

      toast.success("Stadium updated successfully!", {
        duration: 3000,
      });

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 3000);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error updating stadium. Please try again!", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    console.log("Modal is not open, returning null");
    return null;
  }

  const removeImage = (index: number) => {
    const updatedImages = [...formData.imageUrls];
    updatedImages[index] = ""; 
    setFormData((prev) => ({
      ...prev,
      imageUrls: updatedImages,
    }));
  };

  console.log("Rendering modal content");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster richColors position="top-center" />
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Center</h2>
          <Button variant="ghost" className="h-8 w-8 p-0" onPress={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sport</label>
              <select
                name="centerType"
                value={formData.centerType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Type</option>
                <option value="FOOTBALL">FOOTBALL</option>
                <option value="BADMINTON">BADMINTON</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {formData.imageUrls.map((imageUrl, index) => (
                  <div key={index} className="relative border rounded-md p-2">
                    {formData.imageUrls[index] ? (
                      <div className="relative w-full aspect-[16/9]">
                        <img
                          src={getImageUrl(formData.imageUrls[index])}
                          alt={`Center image ${index + 1}`}
                          className="rounded-md object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="text-xs text-gray-500">Upload image</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit" className="bg-black text-white" disabled={loading}>
                {loading ? "Updating..." : "Update Center"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCenterModal;