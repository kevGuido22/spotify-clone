import type { RefObject } from 'react';


export interface Playlist {
    id: string;
    albumId: number;
    title: string;
    color: (typeof colors)[keyof typeof colors];
    cover: string;
    artists: string[];
}

export interface Song {
    id: number;
    albumId: number;
    title: string;
    image: string;
    artists: string[];
    album: string;
    duration: string;
}

type CurrentSong = Pick<Song, "image" | "title" | "artists">;

export interface CurrentMusic {
    song: Song | null;
    playlist: Playlist | null;
    songs: Song[] | null;
}

export interface PlayerStore {
    isPlaying: boolean;
    CurrentMusic: CurrentMusic;
    volume: number;
    setVolume: (volume: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentMusic: (currentMusic: CurrentMusic) => void;
}

export interface ColorStore{
    bgColor: string;
    setBgColor: (bgColor: string) => void
}

export interface PlayerMobileProps {
    audio: RefObject<HTMLAudioElement>;
}