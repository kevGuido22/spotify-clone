import { usePlayerStore } from "@/store/playerStore.ts";
import { useEffect, useRef, useState } from "react";
import { SongControl } from "./SongControl";
import { VolumeControl } from "./VolumeControl";
import { CurrentSong } from "./CurrentSong";
import { Play } from "@/icons/Play";
import { Pause } from "@/icons/Pause";
import { Prev } from "@/icons/Prev";
import { Next } from "@/icons/Next";
import type { Song } from "@/interfaces/types";
import { playlists } from "@/lib/data";

export function Player() {
    const { isPlaying, setIsPlaying, CurrentMusic, setCurrentMusic, volume } =
        usePlayerStore((state) => state);

    const audioRef = useRef<HTMLAudioElement>(null);
    const volumeRef = useRef(1);

    //pause and play
    useEffect(() => {
        isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }, [isPlaying]);

    //volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    //change song
    useEffect(() => {
        const { song, playlist, songs } = CurrentMusic;
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`;
            if (audioRef.current) {
                audioRef.current.src = src;
                audioRef.current.volume = volume;
                audioRef.current.play();
            }
        }
    }, [CurrentMusic]);

    const getSongIndex = (songs: Array<Song>, currentSong: Song) => {
        return songs.findIndex((song) => song.id == currentSong.id);
    };

    //nextSong
    const getNextSong = (currentIndex: number, songs: Array<Song>) => {
        let nextSong;
        if ((currentIndex + 1) < songs.length) {
            return (nextSong = songs[currentIndex + 1]);
        } else {
            return (nextSong = songs[0]);
        }
    };
    //prevSong
    const getPrevSong = (currentIndex: number, songs: Array<Song>) => {
        let prevSong;
        console.log(currentIndex);
        if ((currentIndex - 1) >= 0) {
            return (prevSong = songs[currentIndex - 1]);
        } else {
           
            return (prevSong = songs[songs.length - 1]);
        }
    };

    //changeSong
    const handleSong = (typeAction: string) => {
        const { song: currentSong, playlist, songs } = CurrentMusic;

        if (songs && currentSong && playlist) {
            let currentIndex;
            let newSong = null;

            currentIndex = getSongIndex(songs, currentSong);

            console.log(songs);

            if (typeAction === 'next') {
                newSong = getNextSong(currentIndex, songs);
            } else if (typeAction === 'prev') {
                newSong = getPrevSong(currentIndex, songs);
            }

            setCurrentMusic({
                playlist,
                songs,
                song: newSong,
            });
        }
    };

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex-row justify-between w-full px-1 z-50 relative hidden sm:flex">
            <div className="w-[300px]">
                {CurrentMusic.song && <CurrentSong {...CurrentMusic.song} />}
            </div>

            <div className="grid place-content-center w-auto gap-4 flex-1 absolute inset-0">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-6">
                        <button
                            onClick={() => handleSong("prev")}
                            className="opacity-80 hover:opacity-100 hidden sm:block"
                        >
                            <Prev />
                        </button>
                        <button
                            className="bg-white rounded-full p-2 text-black"
                            onClick={handleClick}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <button
                            onClick={() => handleSong("next")}
                            className="opacity-80 hover:opacity-100 hidden sm:block"
                        >
                            <Next />
                        </button>
                    </div>

                    <SongControl audio={audioRef} />

                    <audio ref={audioRef}></audio>
                </div>
            </div>

            <div className="place-content-center">
                <VolumeControl />
            </div>
        </div>
    );
}
