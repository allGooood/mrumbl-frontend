import toast from "react-hot-toast";
import { getErrorMessage } from "./errorHandler";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-center",
    style: {
      background: "#10b981",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
  });
};


export const showErrorToast = (
  error: unknown, 
  defaultMessage: string = "오류가 발생했습니다.",
  id?: string
) => {
  const message = error instanceof Error 
    ? error.message 
    : getErrorMessage(error, defaultMessage);
  
  toast.error(message, {
    id: id || message, // 동일한 메시지는 자동으로 중복 방지
    duration: 4000,
    position: "top-center",
    style: {
      background: "#ef4444",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
  });
};


export const showInfoToast = (message: string) => {
  toast(message, {
    duration: 3000,
    position: "top-center",
    icon: "ℹ️",
    style: {
      background: "#3b82f6",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
  });
};


export const showWarningToast = (message: string) => {
  toast(message, {
    duration: 3500,
    position: "top-center",
    icon: "⚠️",
    style: {
      background: "#f59e0b",
      color: "#fff",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "500",
    },
  });
};


export const showLoadingToast = async <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error?: string;
  }
): Promise<T> => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error || "오류가 발생했습니다.",
    },
    {
      position: "top-center",
      style: {
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "14px",
        fontWeight: "500",
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: "#10b981",
          secondary: "#fff",
        },
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      },
    }
  );
};
