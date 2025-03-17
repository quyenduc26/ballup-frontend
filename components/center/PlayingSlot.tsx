"use client";

import { useState, ChangeEvent, FormEvent, useEffect, act } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@heroui/react";
import { Edit, Plus } from "lucide-react";
import { SonnerToast } from "@/components/sonnerMesage";
import playingApi from "@/service/playingApi";
import { Field, PlayingSlotType, Slot } from "@/types";

const PlayingSlot = ({ field, action, refresh, slot }: { field: Field, action: string, refresh: () => void, slot?: Slot }) => {
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

  const [isOpenCreateSlot, setIsOpenCreateSlot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<Field | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      if (action == "CREATE") {
        const response = await playingApi.createPlayingSlot(formData);
        setToastData({
          type: "success",
          heading: "Slot created",
          message: "Slot created successfully!",
          duration: 3000,
        });
      } else {
        const response = await playingApi.updatePlayingSlot(formData);
        setToastData({
          type: "success",
          heading: "Slot updated",
          message: "Slot successfully!",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setToastData({
        type: "error",
        heading: "Action Failed",
        message: "Create or update unsuccessfully!",
        duration: 3000,
      });
    }
    setIsLoading(false)
    refresh()
    onClose()
  };

  const handleCreateSlot = (field: Field, slot?: Slot) => {
    setSelectedCenter(field);
    setIsOpenCreateSlot(true);

    if (action === "UPDATE" && slot) {
      setFormData({
        name: slot.name,
        primaryPrice: slot.primaryPrice,
        nightPrice: slot.nightPrice,
        playingCenterId: parseInt(field.id),
        playingSlot: slot
      });
    } else {
      setFormData({
        name: "",
        primaryPrice: 0,
        nightPrice: 0,
        playingCenterId: parseInt(field.id),
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
    }
  }, [isOpen, action, slot]);

  return (
    <>
      <SonnerToast toast={toastData} />
      <Button onPress={() => handleCreateSlot(field, slot)} className="rounded-md">
        {action === "CREATE" ? (
          <>
            <Plus className="w-4 h-4" /> Slot
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
              <ModalHeader className="flex flex-col gap-1">{action == "CREATE" ? `Create slot for ${selectedCenter?.name}` : `Update slot  ${selectedCenter?.name} `}</ModalHeader>
              <ModalBody>
                {/* Input Slot Name */}
                <Input
                  isRequired
                  label="Slot name"
                  placeholder="Enter slot name"
                  variant="bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeName}
                />

                {/* Input Primary Price */}
                <Input
                  isRequired
                  min="0"
                  label="Enter day price"
                  placeholder="Enter day price"
                  type="number"
                  variant="bordered"
                  name="primaryPrice"
                  value={formData.primaryPrice.toString()}
                  onChange={handleChange}
                />

                {/* Input Night Price */}
                <Input
                  isRequired
                  min="0"
                  label="Enter night price"
                  placeholder="Enter night price"
                  type="number"
                  variant="bordered"
                  name="nightPrice"
                  value={formData.nightPrice.toString()}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleCloseModal}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {isLoading ? <Spinner color="white" size="sm" /> : (action == "CREATE" ? "Create" : "Update")}
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
