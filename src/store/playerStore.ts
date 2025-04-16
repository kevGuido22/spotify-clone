import { create } from "zustand";
import type { Song, Playlist, CurrentMusic, PlayerStore } from "@/interfaces/types";

export const usePlayerStore = create<PlayerStore>((set) => ({
    isPlaying: false,
    CurrentMusic: { playlist: null, song: null, songs: [] },
    volume: 1,
    setVolume: (volume) => set({ volume }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ CurrentMusic: currentMusic }),
}));
