import { createContext } from "react";
import type { LoginFormData } from "./LoginFormProvider";

interface LoginFormContextType {
    formData: LoginFormData;
    updateField: <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => void;
    resetForm: () => void;
  }
  
  export const LoginFormContext = createContext<LoginFormContextType | undefined>(undefined);