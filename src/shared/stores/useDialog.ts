import { create } from "zustand";

export interface AppDialogOptions {
  title?: string;
  description: string;
  subDescription?: string;
  buttonLabel?: string;
  onConfirm?: () => void;
  onSecondaryAction?: () =>  void;
}

interface AppDialogState {
  options: AppDialogOptions | null;
  showDialog: (options: AppDialogOptions) => void;
  hideDialog: () => void;
}

export const useDialog = create<AppDialogState>((set) => ({
  options: null,
  showDialog: (options) => set({ options }),
  hideDialog: () => set({ options: null }),
}));
