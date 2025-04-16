// import { playlists } from "@/lib/data";
import { Play } from "@/icons/Play";
import { Pause } from "@/icons/Pause";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id, customClass = "" }) {
    const { isPlaying, CurrentMusic, setIsPlaying, setCurrentMusic } =
        usePlayerStore((state) => state);
    const isPlayingPlaylist = isPlaying && CurrentMusic?.playlist.id === id;

    const handleClick = async () => {
        if (isPlayingPlaylist) {
            setIsPlaying(false);
            return;
        }
        // fetch(`/api/get-info-playlist.json?id=${id}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         const { songs, playlist } = data;
        //         setIsPlaying(true);
        //         setCurrentMusic({
        //             songs,
        //             playlist,
        //             song: songs[0],
        //         });
        //     });

        const response = await fetch(`/api/get-info-playlist.json?id=${id}`);

        const data = await response.json();
        const { songs, playlist } = data;

        setIsPlaying(true);
        
        setCurrentMusic({
            songs,
            playlist,
            song: songs[0],
        });

    };

    return (
        <button
            onClick={handleClick}
            className={`${customClass} card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400  flex items-center justify-center text-black `}
        >
            {isPlayingPlaylist ? <Pause /> : <Play />}
        </button>
    );
}
