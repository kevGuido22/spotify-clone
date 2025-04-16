import { create } from "zustand";
import type { ColorStore } from "@/interfaces/types";

export const useColorStore = create<ColorStore>((set) => ({
    bgColor: '#30275b',
    setBgColor: (bgColor) => set({bgColor})
}))