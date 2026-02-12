import { createContext } from "react";

export interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  message: string;
  setMessage: (value: string) => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
