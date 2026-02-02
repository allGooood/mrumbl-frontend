import { useContext } from "react";
import { LoginFormContext } from "../context/LoginForm.context";

export const useLoginForm = () => {
    const context = useContext(LoginFormContext);
    if (!context) {
        throw new Error('useLoginForm must be used within LoginFormProvider');
    }
    return context;
};