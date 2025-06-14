import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        if (email && password) {
          set({ isAuthenticated: true });
        }
      },
      logout: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
