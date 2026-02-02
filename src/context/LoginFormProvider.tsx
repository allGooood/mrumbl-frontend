import { useState } from 'react';
import { LoginFormContext } from './LoginForm.context';

export interface LoginFormData {
  email: string;
  name?: string;
  password?: string;
  mobile?: string;
  confirmPassword?: string;
  securityCodeTtl?: number;
}

export const LoginFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    name: '',
    password: '',
    mobile: '',
    confirmPassword: '',
    securityCodeTtl: 0,
  });

  const updateField = <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      password: '',
      mobile: '',
      confirmPassword: '',
      securityCodeTtl: 0,
    });
  };

  return (
    <LoginFormContext.Provider value={{ formData, updateField, resetForm }}>
      {children}
    </LoginFormContext.Provider>
  );
};
