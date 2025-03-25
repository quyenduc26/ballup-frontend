"use client";
import type React from "react";
import type { Field } from "@/types";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Button } from "@heroui/react";
import { toast, Toaster } from "sonner";

import image from "@/public/images/image 3.png";
import ownerApi from "@/service/ownerApi";
import PlayingSlot from "@/components/center/PlayingSlot";
import EditCenterModal from "@/components/owner/edit-center-modal";
import playingApi from "@/service/playingApi";

type FieldListProps = {
  setActiveTab: (tab: string) => void;
};

export const FieldList: React.FC<FieldListProps> = ({ setActiveTab }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>(
    {},
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null);

  const toggleSubFields = (fieldId: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const handleEdit = (fieldId: string) => {
    setSelectedCenterId(Number(fieldId));
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsRefresh((prev) => !prev);
    toast.success("Center updated successfully", { duration: 3000 });
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data") || "{}");
        const userId = data?.id;

        if (userId) {
          const response = await ownerApi.getOwnerCenter(userId);

          setFields(response.data);
        }
      } catch (error) {
        console.error("Error fetching fields:", error);
        toast.error("Failed to fetch fields", { duration: 3000 });
      }
    };

    fetchFields();
  }, [isRefresh]);

  const handleDelete = async (fieldId: string) => {
    toast("Are you sure you want to delete this center?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await playingApi.deletePlayingCenter(Number(fieldId));
            setFields((prevFields) =>
              prevFields.filter((field) => field.id !== fieldId),
            );
            toast.success("Center deleted successfully", { duration: 3000 });
          } catch (error) {
            console.error("Error deleting center:", error);
            toast.error("Failed to delete center", { duration: 3000 });
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => { },
      },
      duration: 5000,
    });
  };

  return (
    <div className="w-full p-2 sm:p-4 lg:p-6">
      <Toaster richColors position="top-center" />
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-0">
          Management Fields
        </h1>
        <Button
          className="bg-black rounded-none text-white text-sm sm:text-base py-2 px-4"
          onPress={() => setActiveTab("CreateCenter")}
        >
          Create center
        </Button>
      </div>

      {/* Table header - Ẩn trên mobile, chỉ hiển thị từ sm trở lên */}
      <div className="hidden sm:grid sm:grid-cols-4 font-semibold border-b pb-2 text-xs sm:text-sm w-full">
        <div className="pl-4">Field Name</div>
        <div className="text-center">Image</div>
        <div className="text-center">Location</div>
        <div className="text-right pr-6">Action</div>
      </div>

      {/* Field List */}
      <div className="space-y-3 mt-2">
        {fields.map((field, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center w-full gap-2 sm:gap-4 p-3 sm:p-4 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
                {/* Field Name */}
                <div className="w-full sm:pl-4">
                  <h1 className="text-sm font-medium sm:text-base">
                    {field.name}
                  </h1>
                  {/* Hiển thị address trên mobile */}
                  <p className="text-xs text-gray-600 sm:hidden">
                    {field.address}
                  </p>
                </div>

                {/* Image */}
                <div className="flex justify-center w-full sm:w-auto">
                  <div className="relative w-full max-w-[120px] sm:max-w-[176px] aspect-[16/9]">
                    <Image
                      fill
                      alt={field.name}
                      className="rounded-md object-cover"
                      src={image || "/placeholder.svg"}
                    />
                  </div>
                </div>

                {/* Location - Ẩn trên mobile */}
                <div className="hidden sm:flex sm:items-center sm:justify-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {field.address}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-1 w-full sm:w-auto">
                  {field.slots?.length > 0 && (
                    <>
                      <Button
                        className="h-8 w-8"
                        size="sm"
                        variant="ghost"
                        onPress={() => toggleSubFields(field.id)}
                      >
                        {expandedFields[field.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </>
                  )}
                  <>
                    <Button
                      className="h-8 w-8"
                      size="sm"
                      variant="ghost"
                      onPress={() => handleEdit(field.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      className="h-8 w-8 text-red-500 hover:bg-red-100"
                      size="sm"
                      variant="ghost"
                      onPress={() => handleDelete(field.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <PlayingSlot
                      action="CREATE"
                      field={field}
                      refresh={() => setIsRefresh(true)}
                    />
                  </>
                </div>
              </div>
            </CardHeader>

            {/* SubFields */}
            {field.slots?.length > 0 && expandedFields[field.id] && (
              <CardBody className="border-t bg-white p-2 sm:p-4">
                <div className="space-y-2">
                  <div className="overflow-auto max-h-[300px]">
                    {/* Fixed header - Chỉ hiển thị từ sm trở lên */}
                    <div className="hidden sm:block sticky top-0 z-10 bg-stone-200">
                      <div className="grid grid-cols-4 items-center gap-3 py-2 px-4">
                        <div className="text-left pl-4">
                          <h2 className="text-xs sm:text-sm font-medium">
                            Name
                          </h2>
                        </div>
                        <div className="text-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Primary price
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-xs sm:text-sm font-medium">
                            Night price
                          </span>
                        </div>
                        <div className="text-right pr-4">
                          <span className="text-xs font-medium">Actions</span>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable content - Responsive trên mobile */}
                    {field.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-2 py-2 px-2 sm:px-4 bg-stone-100 rounded-md shadow-sm"
                      >
                        <div className="text-left sm:pl-4">
                          <h2 className="text-xs sm:text-sm font-medium">
                            {slot.name}
                          </h2>
                        </div>
                        <div className="text-left sm:text-center">
                          <span className="text-[10px] sm:text-xs">
                            Primary: {slot.primaryPrice}
                          </span>
                        </div>
                        <div className="text-left sm:text-center">
                          <span className="text-[10px] sm:text-xs">
                            Night: {slot.nightPrice}
                          </span>
                        </div>
                        <div className="text-right sm:pr-4">
                          <PlayingSlot
                            action="UPDATE"
                            field={field}
                            refresh={() => setIsRefresh(true)}
                            slot={slot}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            )}
          </Card>
        ))}
      </div>
      {selectedCenterId && (
        <EditCenterModal
          centerId={selectedCenterId}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};
