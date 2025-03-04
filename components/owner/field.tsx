"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Edit } from "lucide-react";
import { Button } from "@heroui/react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import image from "@/public/images/image 3.png";
import ownerApi from "@/service/ownerApi";


interface Field {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrls: string[];
  slots: { id: number, name: string, primaryPrice: number, nightPrice: number }[]
}

// const fields: Field[] = [
//   {
//     id: "1",
//     name: "WinWin Field",
//     location: "Mỹ khê 3 Sơn Trà Đà Nẵng",
//     hasSubFields: true,
//     subFields: [
//       { id: "1-1", name: "Field 1", price: "200,000 - 300,000 VND" },
//       { id: "1-2", name: "Field 2", price: "200,000 - 300,000 VND" },
//       { id: "1-3", name: "Field 3", price: "200,000 - 300,000 VND" },
//     ],
//   },
//   // { id: "2", name: "Dana Field", location: "Mỹ khê 3 Sơn Trà Đà Nẵng" },
//   // { id: "3", name: "Le Sat Field", location: "Mỹ khê 3 Sơn Trà Đà Nẵng" },
//   // { id: "4", name: "Thanh Khe Field", location: "Mỹ khê 3 Sơn Trà Đà Nẵng" },
//   // { id: "5", name: "Van Son Field", location: "Mỹ khê 3 Sơn Trà Đà Nẵng" },
// ];

export default function FieldList() {
  const [fields, setFields] = useState<Field[]>([]);
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});

  const toggleSubFields = (fieldId: string) => {
    setExpandedFields((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
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
      }
    };

    fetchFields();
  }, []);


  return (
    <div className="flex w-full">
      <div className="w-full p-1 sm:p-2 md:p-4 lg:p-6">
        <h1 className="text-xl font-bold mb-4">
          Management Booking Request
        </h1>

        <div className="flex items-center justify-between font-semibold border-b pb-2 text-xs sm:text-sm md:text-base w-full">
          <div className="pl-2 md:pl-4 lg:pl-6">Field Name</div>
          <div className="flex-1 flex justify-center">Image</div>
          <div className="flex-1 flex justify-center">Location</div>
          <div className="flex justify-end pr-2 md:pr-6">Action</div>
        </div>



        {/* Field List */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 md:mt-4">
          {fields.map((field, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div
                  key={field.id}
                  className="flex items-center w-full gap-4 p-4 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
                >
                  {/* Field Name */}
                  <div className="w-1/6 min-w-[100px]">
                    <h1 className="text-sm md:text-base font-medium">{field.name}</h1>
                  </div>

                  {/* Image */}
                  <div className="w-2/6 flex justify-center">
                    <div className="relative w-full max-w-[176px] aspect-[16/9]">
                      <Image
                        src={image}
                        alt={field.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="w-2/6 flex items-center justify-end">
                    <p className="text-xs md:text-sm text-gray-600">
                      {field.address}
                    </p>
                  </div>

                  {/* Expand/Collapse Button */}
                  {field.slots?.length > 0 && (
                    <div className="w-1/6 flex justify-end min-w-[60px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onPress={() => toggleSubFields(field.id)}
                        className="h-8 w-8 md:h-10 md:w-10 "
                      >
                        {expandedFields[field.id] ? (
                          <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* SubFields */}
              {field.slots?.length > 0 && expandedFields[field.id] && (
                <CardBody className="border-t bg-white p-1 sm:p-2 md:p-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="overflow-auto max-h-[400px]">
                      {/* Cố định header */}
                      <div className="sticky top-0 z-10 bg-stone-200">
                        <div className="flex items-center justify-between gap-2 md:gap-3 py-2 px-1 sm:px-2 md:px-4">
                          <div className="w-1/6 min-w-[150px] text-left md:pl-4"> {/* Chỉnh sửa ở đây */}
                            <h2 className="text-xs sm:text-sm font-medium">Name</h2>
                          </div>

                          <div className="w-2/6 min-w-[150px] text-left"> {/* Chỉnh sửa ở đây */}
                            <span className="text-[10px] flex sm:text-xs md:text-sm justify-center md:justify-start">
                              <b>Price:</b>
                            </span>
                          </div>

                          <div className="w-1/6 min-w-[100px] flex justify-center md:justify-start md:pr-4">
                            <span className="text-xs font-medium">Actions</span>
                          </div>
                        </div>
                      </div>

                      {/* Các giá trị chạy theo khi cuộn */}
                      {field.slots.map((slot) => (
                        <div key={slot.id} className="flex items-between justify-between gap-2 md:gap-3 py-2 px-1 sm:px-2 md:px-4 bg-stone-100 rounded-md shadow-sm">
                          <div className="w-1/6 min-w-[150px] text-left md:pl-4"> {/* Chỉnh sửa ở đây */}
                            <h2 className="text-xs sm:text-sm font-medium">{slot.name}</h2>
                          </div>

                          <div className="w-2/6 min-w-[150px] text-left"> {/* Chỉnh sửa ở đây */}
                            <span className="text-[10px] flex sm:text-xs md:text-sm justify-center md:justify-start">
                              <b>Price:</b> {slot.primaryPrice + "-" + slot.nightPrice}
                            </span>
                          </div>

                          <div className="w-1/6 min-w-[100px] flex justify-center md:justify-start md:pr-4">
                            <Button
                              variant="shadow"
                              size="sm"
                              className="flex items-center bg-black h-6 sm:h-8 md:h-10 px-2 sm:px-3"
                            >
                              <Edit className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                              <span className="ml-1 text-[10px] sm:text-xs text-white">Edit</span>
                            </Button>
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
      </div>
    </div>
  );
}