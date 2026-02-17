import { Toaster } from "react-hot-toast";

const GlobalToaster = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
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
      }}
    />
  );
};

export default GlobalToaster;
