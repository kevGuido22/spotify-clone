import { usePlayerStore } from "@/store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Slider } from "./Slider";
import { useEffect, useRef, useState } from "react";
import type { PlayerMobileProps } from "@/interfaces/types";
import { RowPlayButton } from "./RowPlayButton";

export function PlayerMobile({ audio }: PlayerMobileProps) {
    const { isPlaying, setIsPlaying, CurrentMusic, volume } = usePlayerStore(
        (state) => state
    );
    const audioRef = useRef<HTMLAudioElement>(null);

    //pause and play
    useEffect(() => {
        isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }, [isPlaying]);

    //change song
    useEffect(() => {
        const { song, playlist } = CurrentMusic;
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`;
            if (audioRef.current) {
                audioRef.current.src = src;
                audioRef.current.volume = volume;
                audioRef.current.play();
            }
        }
    }, [CurrentMusic]);

    //handle time
    useEffect(() => {
        audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audioRef.current?.removeEventListener(
                "timeupdate",
                handleTimeUpdate
            );
        };
    });

    const handleTimeUpdate = () => {
        if (audioRef.current?.currentTime != undefined) {
            setCurrentTime(audioRef.current?.currentTime);
        }
    };

    const [currentTime, setCurrentTime] = useState(0);

    return (
        <div className="w-full">
            {CurrentMusic.song && CurrentMusic.playlist && CurrentMusic.songs && (
                <>
                    <div className="py-2 px-4 flex justify-between items-center">
                        <CurrentSong {...CurrentMusic.song} />
                        <RowPlayButton
                            playlistId={CurrentMusic.playlist.id}
                            songId={CurrentMusic.song.id}
                            playlistSongs={CurrentMusic.songs}
                        />
                    </div>
                    <Slider
                        value={[currentTime]}
                        onValueChange={([value]) => {
                            audioRef.current.currentTime = value;
                        }}
                    />
                </>
            )}
            <audio ref={audioRef}></audio>
        </div>
    );
}
