import React, { useEffect } from "react";
import { toast, Toaster } from "sonner";

type ToastType = {
  heading?: string;
  message?: string;
  type?: "error" | "success" | "info" | "warning";
  duration?: number;
};

type ToastData = {
  toast: ToastType | undefined;
};

const SonnerToast = ({ toast: toastData }: ToastData) => {
  useEffect(() => {
    if (toastData) {
      const { heading, message, type, duration } = toastData;
      const toastMessage = heading ? `${heading}: ${message}` : message;

      // Map type to corresponding Sonner toast method
      switch (type) {
        case "success":
          toast.success(toastMessage, {
            duration: duration || 3000,
          });
          break;
        case "error":
          toast.error(toastMessage, {
            duration: duration || 3000,
          });
          break;
        case "warning":
          toast.warning(toastMessage, {
            duration: duration || 3000,
          });
          break;
        case "info":
        default:
          toast.info(toastMessage, {
            duration: duration || 3000,
          });
          break;
      }
    }
  }, [toastData]);

  return <Toaster richColors position="top-center" />;
};

// Example usage
const App = () => {
  const showToast = () => {
    const toastData: ToastType = {
      heading: "Thông báo",
      message: "Thao tác thành công!",
      type: "success",
      duration: 3000,
    };

    return <SonnerToast toast={toastData} />;
  };

  return (
    <div>
      <button onClick={showToast}>Show Toast</button>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export { SonnerToast, App };
