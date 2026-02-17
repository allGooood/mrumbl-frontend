import { create } from "zustand";

export interface AppDialogOptions {
  title: string;
  description: string;
  buttonLabel?: string;
  onConfirm?: () => void;
}

interface AppDialogState {
  options: AppDialogOptions | null;
  showDialog: (options: AppDialogOptions) => void;
  hideDialog: () => void;
}

export const useAppDialogStore = create<AppDialogState>((set) => ({
  options: null,
  showDialog: (options) => set({ options }),
  hideDialog: () => set({ options: null }),
}));
