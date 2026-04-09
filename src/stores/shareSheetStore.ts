import { create } from "zustand";

export type SharePayload = {
  title?: string;
  url: string;
  text?: string;
};

type ShareSheetState = {
  open: boolean;
  payload: SharePayload | null;
  openShare: (payload: SharePayload) => void;
  closeShare: () => void;
};

export const useShareSheetStore = create<ShareSheetState>((set) => ({
  open: false,
  payload: null,
  openShare: (payload) => set({ open: true, payload }),
  closeShare: () => set({ open: false }),
}));

