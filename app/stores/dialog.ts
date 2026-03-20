import { create } from 'zustand'
import { persist } from "zustand/middleware";

export type DialogStore = {
  shouldShow: boolean,
  setShown: () => void,
}

export const useDialogStore = create(
  persist<DialogStore>(
    (set) => ({
      shouldShow: true,
      setShown: () => set({ shouldShow: false }),
    }),
    {
      name: "dialog-store",
    }
  ),
);