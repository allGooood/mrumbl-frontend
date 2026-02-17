import type React from "react";
import { useState } from "react";
import { LoadingContext } from "./Loading.context";
import GlobalFullPageLoader from "../../components/ui/layout/GlobalFullPageLoader";

const DEFAULT_MESSAGE = "Loading...";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  const handleSetLoading = (value: boolean) => {
    setLoading(value);
    if (!value) {
      setMessage(DEFAULT_MESSAGE);
    }
  };

  return (
    <LoadingContext.Provider value={{
                                    loading,
                                    setLoading: handleSetLoading,
                                    message,
                                    setMessage,
    }}>
        {loading && <GlobalFullPageLoader message={message} />}
        {children}
    </LoadingContext.Provider>
  );
};
