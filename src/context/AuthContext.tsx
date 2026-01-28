import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storage";

export const AuthContext = createContext<{
    isAuthenticated: boolean;
    // user: User | null;
    // setAuthenticated: (value: boolean) => void;
}>({
    isAuthenticated: false,
    // user: null,
    // setAuthenticated: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 초기값을 localStorage에서 직접 읽어와서 동기적으로 설정
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

        // storage 이벤트 리스너 추가 (다른 탭에서의 변경 감지)
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


