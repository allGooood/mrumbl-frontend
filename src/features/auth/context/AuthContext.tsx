import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "../../../constants/storage";

export const AuthContext = createContext<{
    isAuthenticated: boolean;
}>({
    isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(() => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        return !!token; 
    });

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
            setAuthenticated(!!token);
        };

        checkAuth();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEYS.ACCESS_TOKEN) {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
          {children}
        </AuthContext.Provider>
    );
};
