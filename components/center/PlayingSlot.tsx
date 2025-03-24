"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { Edit, Plus } from "lucide-react";

import { SonnerToast } from "@/components/sonnerMesage";
import playingApi from "@/service/playingApi";
import { Field, PlayingSlotType, Slot } from "@/types";

// Function to format price in Vietnamese style
const formatVND = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
};

// Function to parse price from string to number
const parseVND = (value: string): number => {
  return parseInt(value.replace(/[^\d]/g, "")) || 0;
};

const PlayingSlot = ({
  field,
  action,
  refresh,
  slot,
}: {
  field: Field;
  action: string;
  refresh: () => void;
  slot?: Slot;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();

  const [formData, setFormData] = useState<PlayingSlotType>({
    name: "",
    primaryPrice: 0,
    nightPrice: 0,
    playingCenterId: 0,
  });

  const [displayPrices, setDisplayPrices] = useState({
    primaryPrice: "",
    nightPrice: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    primaryPrice: "",
    nightPrice: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Field | null>(null);

  const validateForm = () => {
    const newErrors = { name: "", primaryPrice: "", nightPrice: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Slot name is required";
      isValid = false;
    }

    if (!formData.primaryPrice || formData.primaryPrice <= 0) {
      newErrors.primaryPrice = "Day price must be greater than 0";
      isValid = false;
    }

    if (!formData.nightPrice || formData.nightPrice <= 0) {
      newErrors.nightPrice = "Night price must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.primaryPrice > 0 &&
      formData.nightPrice > 0
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else {
      const numericValue = parseVND(value);

      setFormData({ ...formData, [name]: numericValue });
      setDisplayPrices({ ...displayPrices, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name !== "name") {
      const value = formData[name as "primaryPrice" | "nightPrice"];

      setDisplayPrices({
        ...displayPrices,
        [name]: formatVND(value),
      });
    }
  };

  const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name !== "name") {
      const value = formData[name as "primaryPrice" | "nightPrice"];

      setDisplayPrices({
        ...displayPrices,
        [name]: value.toString(),
      });
    }
  };

  // In PlayingSlot component
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Check for duplicate slot name when creating
    if (action === "CREATE" && field.slots) {
      const isDuplicateName = field.slots.some(
        (slot) =>
          slot.name.toLowerCase() === formData.name.trim().toLowerCase(),
      );

      if (isDuplicateName) {
        setErrors({
          ...errors,
          name: "Slot name already exists in this field",
        });

        return;
      }
    }

    setIsLoading(true);
    try {
      let response;

      if (action === "CREATE") {
        response = await playingApi.createPlayingSlot(formData);
        setToastData({
          type: "success",
          heading: "Slot created successfully",
          message: "The slot has been created successfully!",
          duration: 3000,
        });
      } else {
        response = await playingApi.updatePlayingSlot(formData);
        setToastData({
          type: "success",
          heading: "Slot updated successfully",
          message: "The slot has been updated successfully!",
          duration: 3000,
        });
      }
      refresh();
      onClose();
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message?.toLowerCase() || "";

      if (
        errorMessage.includes("duplicate") ||
        errorMessage.includes("exists") ||
        errorMessage.includes("already")
      ) {
        setErrors({
          ...errors,
          name: "Slot name already exists in this field",
        });
      } else {
        setToastData({
          type: "error",
          heading: "Operation failed",
          message: error.response?.data?.message || "Create or update failed!",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateSlot = (field: Field, slot?: Slot) => {
    setSelectedCenter(field);
    setErrors({ name: "", primaryPrice: "", nightPrice: "" });

    if (action === "UPDATE" && slot) {
      setFormData({
        name: slot.name,
        primaryPrice: slot.primaryPrice,
        nightPrice: slot.nightPrice,
        playingCenterId: parseInt(field.id),
        playingSlot: slot,
      });
      setDisplayPrices({
        primaryPrice: formatVND(slot.primaryPrice),
        nightPrice: formatVND(slot.nightPrice),
      });
    } else {
      setFormData({
        name: "",
        primaryPrice: 0,
        nightPrice: 0,
        playingCenterId: parseInt(field.id),
      });
      setDisplayPrices({
        primaryPrice: "",
        nightPrice: "",
      });
    }
    onOpen();
  };

  const handleCloseModal = () => {
    setFormData({
      name: "",
      primaryPrice: 0,
      nightPrice: 0,
      playingCenterId: 0,
    });
    setDisplayPrices({
      primaryPrice: "",
      nightPrice: "",
    });
    setErrors({ name: "", primaryPrice: "", nightPrice: "" });
    onClose();
  };

  useEffect(() => {
    if (isOpen && action === "UPDATE" && slot) {
      setFormData({
        name: slot.name,
        primaryPrice: slot.primaryPrice,
        nightPrice: slot.nightPrice,
        playingCenterId: parseInt(field.id),
        playingSlot: slot,
      });
      setDisplayPrices({
        primaryPrice: formatVND(slot.primaryPrice),
        nightPrice: formatVND(slot.nightPrice),
      });
    }
  }, [isOpen, action, slot]);

  return (
    <>
      <SonnerToast toast={toastData} />
      <Button
        className="rounded-md w-0"
        onPress={() => handleCreateSlot(field, slot)}
      >
        {action === "CREATE" ? (
          <>
            <Plus className="w-4 h-4" />
          </>
        ) : (
          <>  
            <Edit className="w-4 h-4" /> Edit
          </>
        )}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "CREATE"
                  ? `Create slot for ${selectedCenter?.name}`
                  : `Update slot ${selectedCenter?.name}`}
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                  label="Slot name"
                  name="name"
                  placeholder="Enter slot name"
                  value={formData.name}
                  variant="bordered"
                  onChange={handleChange}
                />

                <Input
                  isRequired
                  errorMessage={errors.primaryPrice}
                  isInvalid={!!errors.primaryPrice}
                  label="Day price"
                  min="1"
                  name="primaryPrice"
                  placeholder="Enter day price"
                  type="text"
                  value={displayPrices.primaryPrice}
                  variant="bordered"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />

                <Input
                  isRequired
                  errorMessage={errors.nightPrice}
                  isInvalid={!!errors.nightPrice}
                  label="Night price"
                  min="1"
                  name="nightPrice"
                  placeholder="Enter night price"
                  type="text"
                  value={displayPrices.nightPrice}
                  variant="bordered"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isFormValid() || isLoading}
                  onPress={handleSubmit}
                >
                  {isLoading ? (
                    <Spinner color="white" size="sm" />
                  ) : action === "CREATE" ? (
                    "Create"
                  ) : (
                    "Update"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayingSlot;
