import { CardPlayButton } from "./CardPlayButton";
import type { Playlist } from "@/interfaces/types";
import { useColorStore } from "@/store/colorStore";

export function PlayListHorizontalCard({ playlist }: { playlist: Playlist }) {
    const { setBgColor } = useColorStore((state) => state);

    const handleColor = () => {
        let colorAccent = playlist.color.accent;
        setBgColor(colorAccent);
    };

    const setDefaultColor = () => {
        setBgColor("#30275b");
    };

    const handleClickCard = () => {
        handleColor();
    };

    return (
        <article
            onMouseEnter={handleColor}
            onMouseLeave={setDefaultColor}
            onClick={handleClickCard}
            className="group relative hover:bg-zinc-300/30 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300 overflow-hidden cursor-pointer"
        >
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100">
                <CardPlayButton
                    id={playlist.id}
                    // client:visible
                    customClass="w-10 h-10 p-0"
                />
            </div>
            <a className="flex items-center gap-3">
                <picture className="w-16">
                    <img src={playlist.cover} alt="" />
                </picture>
                <h4 className="font-semibold">{playlist.title}</h4>
            </a>
        </article>
    );
}
