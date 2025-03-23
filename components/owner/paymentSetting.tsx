"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { PaymentMethod } from "@/types/owner"
import paymentApi from "@/service/paymentApi"
import { getImageUrl } from "@/utils/getImage"
import { PaymentMethodRequest } from "@/types/form"
import { SonnerToast } from "@/components/sonnerMesage"
import { uploadImage } from "@/utils/uploadImage"


export default function PaymentMethodSettings() {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const ownerId = parsedData.id;
  const [toastData, setToastData] = useState<
    | {
      heading?: string;
      message?: string;
      type?: "error" | "success" | "info" | "warning";
      duration?: number;
    }
    | undefined
  >();
  // State for payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  const [expandedId, setExpandedId] = useState<string | null>(null)

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethod | null>(null)

  // State for editing
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // State for form inputs
  const [formData, setFormData] = useState<PaymentMethodRequest>({
    id: "",
    name: "",
    isActive: false,
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    bankBranch: "",
    qrImageUrl: "",
    instructions: "",
  })

  const [qrPreview, setQrPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)


  //get payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await paymentApi.getAllPaymentMethods(ownerId);
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, [ownerId]);

  const addNewPaymentMethod = async () => {
    console.log(formData)
    try {
      const response = await paymentApi.createPaymentMethod(formData, ownerId);

      // Cập nhật state với phương thức thanh toán mới
      setPaymentMethods((prevMethods) => [...prevMethods, response.data]);
      setToastData({
        type: "success",
        heading: "Created",
        message: "Add new method successfully",
        duration: 3000,
      });
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      setToastData({
        type: "error",
        heading: "Action fail",
        message: "Create method unsuccessfully",
        duration: 3000,
      });
    }
  };


  const updatePaymentMethod = async () => {
    if (!editingId) return;

    try {
      const response = await paymentApi.updatePaymentMethod(parseInt(editingId), {
        name: formData.name,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        accountHolderName: formData.accountHolderName,
        bankBranch: formData.bankBranch,
        qrImageUrl: formData.qrImageUrl,
        instructions: formData.instructions,
        isActive: formData.isActive,
      });
      setToastData({
        type: "success",
        heading: "Updated",
        message: "Update method successfully",
        duration: 3000,
      });

      // Cập nhật state với phương thức thanh toán vừa chỉnh sửa
      setPaymentMethods((prevMethods) =>
        prevMethods.map((method) =>
          method.id === formData.id ? response.data : method
        )
      );

      setShowAddModal(false);
      resetForm();
    } catch (error) {
      setToastData({
        type: "error",
        heading: "Action fail",
        message: "Update method unsuccessfully",
        duration: 3000,
      });
    }
  };


  // Reset form data
  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      isActive: false,
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      bankBranch: "",
      qrImageUrl: "",
      instructions: "",
    })

    setQrPreview(null)
    setIsEditing(false)
    setEditingId(null)
  }

  // Toggle expanded state
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Open add modal
  const openAddModal = () => {
    resetForm()
    setShowAddModal(true)
  }

  // Open edit modal
  const openEditModal = (method: PaymentMethod, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent toggling expansion when clicking edit
    setIsEditing(true)
    setEditingId(method.id)
    setFormData({
      id: method.id,
      name: method.name,
      isActive: method.active,
      bankName: method.bankName,
      accountNumber: method.accountNumber,
      accountHolderName: method.accountHolderName,
      bankBranch: method.bankBranch,
      qrImageUrl: method.qrImageUrl,
      instructions: method.instructions
    })
    setQrPreview(method.qrImageUrl)
    setShowAddModal(true)
  }

  // Open delete confirmation
  const openDeleteConfirmation = (method: PaymentMethod, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent toggling expansion when clicking delete
    setMethodToDelete(method)
    setShowDeleteModal(true)
  }

  // Handle QR image upload
  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = await uploadImage(file);
      setToastData({
        type: "success",
        heading: "Uploaded",
        message: "Uploaded image successfully!",
        duration: 3000,
      });
      if (imageUrl) {
        setQrPreview(imageUrl)
        setFormData({ ...formData, qrImageUrl: imageUrl })
      }
    }
  }

  // Save payment method
  const savePaymentMethod = () => {
    if (
      !formData.name ||
      !formData.bankName ||
      !formData.accountNumber ||
      !formData.accountHolderName ||
      !formData.qrImageUrl
    ) {
      return // Don't save if required fields are empty
    }

    if (isEditing && editingId) {
      // Update existing method
      updatePaymentMethod()
    } else {
      // Add new method
      addNewPaymentMethod()
    }

    resetForm()
    setShowAddModal(false)
  }

  // Set a payment method as active
  const setActivePaymentMethod = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent toggling expansion when clicking set active
    await paymentApi.activeMethod(parseInt(id));
    setToastData({
      type: "success",
      heading: "Actived",
      message: "Method actived successfully!",
      duration: 3000,
    });
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        active: method.id === id,
      })),
    )
  }

  const deletePaymentMethod = async () => {
    if (!methodToDelete) return;

    try {
      // Gọi API xóa phương thức thanh toán
      await paymentApi.deletePaymentMethod(parseInt(methodToDelete.id));

      // Cập nhật danh sách phương thức thanh toán sau khi xóa
      const updatedMethods = paymentMethods.filter((method) => method.id !== methodToDelete.id);
      let newMethods = [...updatedMethods];

      // Kiểm tra nếu phương thức bị xóa đang active thì set active cho phương thức đầu tiên còn lại
      const methodToDeleteObj = paymentMethods.find((method) => method.id === methodToDelete.id);
      if (methodToDeleteObj?.active && updatedMethods.length > 0) {
        newMethods[0] = { ...newMethods[0], active: true };
      }
      setToastData({
        type: "success",
        heading: "Deleted",
        message: "Deleted method successfully",
        duration: 3000,
      });

      setPaymentMethods(newMethods);
      setShowDeleteModal(false);
      setMethodToDelete(null);
    } catch (error) {
      setToastData({
        type: "error",
        heading: "Action fail",
        message: "Delete method unsuccessfully",
        duration: 3000,
      });
    }
  };


  return (
    <div className="container mx-auto py-6 max-w-6xl px-4">
      <SonnerToast toast={toastData} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Method Settings</h1>
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Add Payment Method
        </button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No payment methods added yet. Add a payment method to allow customers to pay.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-sm text-gray-500">
              Manage your payment methods. You can have multiple methods but only one can be active.
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border rounded-lg overflow-hidden">
                  {/* Payment Method Header - Clickable to expand/collapse */}
                  <div
                    className={`p-4 cursor-pointer ${method.active ? "bg-blue-50 border-blue-200" : ""}`}
                    onClick={() => toggleExpand(method.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{method.name}</h3>
                        {method.active && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Active</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => openEditModal(method, e)}
                          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          aria-label="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>

                        <button
                          onClick={(e) => openDeleteConfirmation(method, e)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>

                        {/* Expand/Collapse indicator */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 text-gray-500 transition-transform ${expandedId === method.id ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm text-gray-500">
                        {method.bankName} - {method.accountNumber}
                      </p>

                      {!method.active && (
                        <button
                          onClick={(e) => setActivePaymentMethod(method.id, e)}
                          className="flex items-center px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Set as Active
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content - Payment Details */}
                  {expandedId === method.id && (
                    <div className="border-t p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* QR Code Column */}
                        <div className="flex justify-center items-start">
                          <div className="border rounded-md p-4 bg-white w-full max-w-xs">
                            <p className="text-sm font-medium text-center mb-2">QR Code</p>
                            <div className="flex justify-center">
                              <img
                                src={method.qrImageUrl ? getImageUrl(method.qrImageUrl) : "/placeholder.svg?height=300&width=300"}
                                alt="QR code"
                                className="w-[300px] h-[300px] object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bank Information Column */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <p className="text-sm font-medium">Bank Name</p>
                              <p className="text-sm">{method.bankName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Account Number</p>
                              <p className="text-sm">{method.accountNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Account Holder</p>
                              <p className="text-sm">{method.accountHolderName}</p>
                            </div>
                            {method.bankBranch && (
                              <div>
                                <p className="text-sm font-medium">Branch</p>
                                <p className="text-sm">{method.bankBranch}</p>
                              </div>
                            )}
                          </div>

                          {method.instructions && (
                            <div className="mt-4">
                              <p className="text-sm font-medium">Instructions</p>
                              <p className="text-sm text-gray-500">{method.instructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{isEditing ? "Edit Payment Method" : "Add Payment Method"}</h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Bank Information</h4>

                  <div>
                    <label htmlFor="methodName" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method Name
                    </label>
                    <input
                      type="text"
                      id="methodName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., VietcomBank, MoMo via TPBank"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank name"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="accountHolderName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account holder name"
                      value={formData.accountHolderName}
                      onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="bankBranch" className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Branch (Optional)
                    </label>
                    <input
                      type="text"
                      id="bankBranch"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank branch"
                      value={formData.bankBranch}
                      onChange={(e) => setFormData({ ...formData, bankBranch: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Instructions (Optional)
                    </label>
                    <textarea
                      id="instructions"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter instructions for customers"
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">QR Code</h4>

                  <div>
                    <label htmlFor="qrImage" className="block text-sm font-medium text-gray-700 mb-1">
                      QR Code Image
                    </label>
                    <input
                      type="file"
                      id="qrImage"
                      ref={fileInputRef}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      accept="image/*"
                      onChange={handleQRUpload}
                    />

                    {qrPreview && (
                      <div className="flex justify-center mt-4">
                        <div className="border rounded-md p-2 bg-white">
                          <img
                            src={getImageUrl(qrPreview) || "/placeholder.svg"}
                            alt="QR Code Preview"
                            className="w-36 h-w-36 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Upload a QR code image for this bank account. Customers can scan this QR code to make payments
                      directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePaymentMethod}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditing ? "Save Changes" : "Add Payment Method"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Delete Payment Method</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-700">
                Are you sure you want to delete <span className="font-bold">{methodToDelete?.name}</span> method? This action cannot be undone.
              </p>

            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deletePaymentMethod}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

