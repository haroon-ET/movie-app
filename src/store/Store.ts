// authStore.ts

import { create } from "zustand";

interface AuthStore {
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: "",
  setToken: (token: string) => localStorage.setItem("token", token),
}));
