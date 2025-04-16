import { Slider } from "./Slider";
import { usePlayerStore } from "@/store/playerStore";
import { useRef } from "react";
import { VolumeSilenced, VolumeFull } from "@/icons/Volume";

export function VolumeControl() {
    const setVolume = usePlayerStore((state) => state.setVolume);
    const volume = usePlayerStore((state) => state.volume);
    const previousVolumeRef = useRef(volume);

    const isVolumeSilenced = volume < 0.1;

    const handleClickVolume = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current);
        } else {
            previousVolumeRef.current = volume;
            setVolume(0);
        }
    };

    return (
        <div className="flex justify-center gap-x-2 group">
            <button
                className="opacity-70 hover:opacity-100 transition"
                onClick={handleClickVolume}
            >
                {isVolumeSilenced ? <VolumeSilenced /> : <VolumeFull />}
            </button>

            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[95px] cursor-pointer group"
                onValueChange={(value) => {
                    const [newVolume] = value;
                    const volumeValue = newVolume / 100;
                    setVolume(volumeValue);
                }}
            />
        </div>
    );
}
