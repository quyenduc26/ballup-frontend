"use client"
import { useEffect, useState } from "react"
import type React from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { Card, CardHeader, CardBody } from "@heroui/react"
import { Button } from "@heroui/react"
import image from "@/public/images/image 3.png"
import ownerApi from "@/service/ownerApi"
import PlayingSlot from "@/components/center/PlayingSlot"
import type { Field } from "@/types"
import EditCenterModal from "@/components/owner/edit-center-modal"
import playingApi from "@/service/playingApi"
import { toast, Toaster } from "sonner"  // Added Sonner imports

type FieldListProps = {
  setActiveTab: (tab: string) => void
}

export const FieldList: React.FC<FieldListProps> = ({ setActiveTab }) => {
  const [fields, setFields] = useState<Field[]>([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({})
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCenterId, setSelectedCenterId] = useState<number | null>(null)

  const toggleSubFields = (fieldId: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }))
  }

  const handleEdit = (fieldId: string) => {
    setSelectedCenterId(Number(fieldId))
    setIsEditModalOpen(true)
  }

  const handleEditSuccess = () => {
    setIsRefresh((prev) => !prev)
    toast.success("Center updated successfully", {
      duration: 3000,
    })
  }

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data") || "{}")
        const userId = data?.id

        if (userId) {
          const response = await ownerApi.getOwnerCenter(userId)
          setFields(response.data)
        }
      } catch (error) {
        console.error("Error fetching fields:", error)
        toast.error("Failed to fetch fields", {
          duration: 3000,
        })
      }
    }

    fetchFields()
  }, [isRefresh])

  const handleDelete = async (fieldId: string) => {
    // Using toast.promise for the delete operation with confirmation-like behavior
    toast(
      "Are you sure you want to delete this center?",
      {
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              await playingApi.deletePlayingCenter(Number(fieldId))
              setFields(prevFields => prevFields.filter(field => field.id !== fieldId))
              toast.success("Center deleted successfully", {
                duration: 3000,
              })
            } catch (error) {
              console.error("Error deleting center:", error)
              toast.error("Failed to delete center", {
                duration: 3000,
              })
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
        duration: 5000,
      }
    )
  }

  return (
    <div className="w-full p-1 sm:p-2 md:p-4 lg:p-6">
      <Toaster richColors position="top-center" /> {/* Added Toaster component */}
      
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold mb-4">Management Fields</h1>
        <Button className="bg-black rounded-none text-white" onPress={() => setActiveTab("CreateCenter")}>
          Create center
        </Button>
      </div>

      {/* Table header with grid layout */}
      <div className="grid grid-cols-4 font-semibold border-b pb-2 text-xs sm:text-sm md:text-base w-full">
        <div className="pl-2 md:pl-4 lg:pl-6">Field Name</div>
        <div className="text-center">Image</div>
        <div className="text-center">Location</div>
        <div className="text-right pr-2 md:pr-6">Action</div>
      </div>

      {/* Field List */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 md:mt-4">
        {fields.map((field, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <div
                key={field.id}
                className="grid grid-cols-4 items-center w-full gap-4 p-4 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
              >
                {/* Field Name */}
                <div className="pl-2 md:pl-4">
                  <h1 className="text-sm md:text-base font-medium">{field.name}</h1>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[176px] aspect-[16/9]">
                    <Image
                      fill
                      alt={field.name}
                      className="rounded-md object-cover"
                      src={image || "/placeholder.svg"}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center">
                  <p className="text-xs md:text-sm text-gray-600">{field.address}</p>
                </div>

                {/* Expand/Collapse Button */}
                {field.slots?.length > 0 && (
                  <div className="flex justify-end gap-1">
                    <Button
                      className="h-8 w-8 md:h-10 md:w-10"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(field.id)}
                    >
                      <Pencil className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>

                    <Button
                      className="h-8 w-8 md:h-10 md:w-10 text-red-500 hover:bg-red-100"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(field.id)}
                    >
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>

                    <Button
                      className="h-8 w-8 md:h-10 md:w-10"
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleSubFields(field.id)}
                    >
                      {expandedFields[field.id] ? (
                        <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </Button>

                    <PlayingSlot action="CREATE" field={field} refresh={() => setIsRefresh(true)} />
                  </div>
                )}
              </div>
            </CardHeader>

            {/* SubFields */}
            {field.slots?.length > 0 && expandedFields[field.id] && (
              <CardBody className="border-t bg-white p-1 sm:p-2 md:p-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="overflow-auto max-h-[400px]">
                    {/* Fixed header */}
                    <div className="sticky top-0 z-10 bg-stone-200">
                      <div className="grid grid-cols-4 items-center gap-2 md:gap-3 py-2 px-1 sm:px-2 md:px-4">
                        <div className="text-left md:pl-4">
                          <h2 className="text-xs sm:text-sm font-medium">Name</h2>
                        </div>

                        <div className="text-center">
                          <span className="text-[10px] sm:text-xs md:text-sm font-medium">Primary price</span>
                        </div>

                        <div className="text-center">
                          <span className="text-[10px] sm:text-xs md:text-sm font-medium">Night price</span>
                        </div>

                        <div className="text-right md:pr-4">
                          <span className="text-xs font-medium">Actions</span>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable content */}
                    {field.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="grid grid-cols-4 items-center gap-2 md:gap-3 py-2 px-1 sm:px-2 md:px-4 bg-stone-100 rounded-md shadow-sm"
                      >
                        <div className="text-left md:pl-4">
                          <h2 className="text-xs sm:text-sm font-medium">{slot.name}</h2>
                        </div>

                        <div className="text-center">
                          <span className="text-[10px] sm:text-xs md:text-sm">{slot.primaryPrice}</span>
                        </div>

                        <div className="text-center">
                          <span className="text-[10px] sm:text-xs md:text-sm">{slot.nightPrice}</span>
                        </div>

                        <div className="text-right md:pr-4">
                          <PlayingSlot action="UPDATE" field={field} refresh={() => setIsRefresh(true)} slot={slot} />
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
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          centerId={selectedCenterId}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  )
}