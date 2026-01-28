import { create } from "zustand";
import { persist } from "zustand/middleware";

// TODO - 하나로 합치기
export interface User {
    id: string;
    email: string;
    username: string;
}
  
export interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User, token: string) => void;
    clearUser: () => void;
}

export const useAuthStore = create(persist<AuthState>(
    (set) => ({
        user: null,
        token: null,
        setUser: (user, token) => {set({ user, token })},
        clearUser: () => set({ user: null, token: null }),
    }),
    
    {
        name: "user",
    }
));

