import { usePlayerStore } from "@/store/playerStore"
import { Play } from "@/icons/Play";
import { Pause } from "@/icons/Pause";

import { songs } from './../lib/data';
import type { Song } from "@/interfaces/types";

interface PropsRowPlayButton{
    songId: number;
    playlistId: string | null;
    playlistSongs: Song[];
    customClass?: string;
}

export function RowPlayButton ({ songId, playlistId, playlistSongs, customClass }: PropsRowPlayButton) {

    const { setCurrentMusic, CurrentMusic, setIsPlaying, isPlaying } = usePlayerStore();

    const isPlayingCurrentSong = isPlaying && CurrentMusic?.playlist?.id == playlistId && CurrentMusic?.song?.id == songId;

    const handleSong = async () => {
        const currentSong = playlistSongs.find((song) => song.id === songId) || null;

        if(isPlaying){
            setIsPlaying(false);
            setCurrentMusic({ ...CurrentMusic, song: currentSong});
            console.log(CurrentMusic);
            return;
        }

        const response = await fetch(`/api/get-info-playlist.json?id=${playlistId}`);
        const data = await response.json();

        const {playlist, songs} = data;
        //
        setIsPlaying(true);

        setCurrentMusic({
            playlist: playlist,
            songs: songs,
            song: currentSong,
        })
    }

    return (
        <button className={`${customClass} flex`} onClick={handleSong}>
            { isPlayingCurrentSong ?  <Pause/> :  <Play/>}
        </button>
    )
}