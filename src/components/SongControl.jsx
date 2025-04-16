import { Slider } from "./Slider";
import { useEffect, useState } from "react";

export function SongControl({ audio }) {
    const [currentTime, setCurrentTime] = useState(0);

    //actualizar el estado del slider, la duracion
    useEffect(() => {
        audio.current.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audio.current.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime);
    };

    const formatTime = (time) => {
        if (time == null) return "0:00";

        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const duration = audio?.current?.duration ?? 0;

    return (
        <div className="flex gap-x-2 text-xs pt-2 w-full">
            <span className="opacity-50 w-12 text-right">
                {formatTime(currentTime)}
            </span>
            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="w-[450px] cursor-pointer group"
                onValueChange={(value) => {
                    audio.current.currentTime = value;
                }}
            />

            <span className="opacity-50 w-12">
                {duration ? formatTime(duration) : "0:00"}
            </span>
        </div>
    );
}
