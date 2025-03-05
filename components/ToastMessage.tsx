import React, { useEffect, useRef, useState } from "react";

type ToastType = {
  heading?: string;
  message?: string;
  type?: "error" | "success" | "info" | "warn";
  duration?: number;
};

type ToastData = {
  toast: ToastType | undefined;
};

const toastStyles: Record<string, React.CSSProperties> = {
  success: {
    backgroundColor: "#d1f5d3",
    borderLeft: "6px solid #2ecc71",
    color: "#2d7d2d",
  },
  error: {
    backgroundColor: "#f8d7da",
    borderLeft: "6px solid #e74c3c",
    color: "#721c24",
  },
  warn: {
    backgroundColor: "#fff3cd",
    borderLeft: "6px solid #f39c12",
    color: "#856404",
  },
  info: {
    backgroundColor: "#d1ecf1",
    borderLeft: "6px solid #17a2b8",
    color: "#0c5460",
  },
};

const ToastMessage = ({ toast: toastData }: ToastData) => {
  const [visible, setVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastData) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
      }, toastData.duration || 500);

      return () => clearTimeout(timeout);
    }
  }, [toastData]);

  if (!toastData || !visible) return null;

  const { heading, message, type } = toastData;
  const style = toastStyles[type || "info"];

  return (
    <div
      ref={toastRef}
      style={{
        ...style,
        position: "fixed",
        top: "5px",
        right: "20px",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        minWidth: "250px",
        fontSize: "14px",
      }}
    >
      <strong>{heading || "Notification"}</strong>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
};

export { ToastMessage };
