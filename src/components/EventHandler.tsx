import { useEffect } from "react";
import { useColorStore } from "@/store/colorStore";
import type { ColorStore } from "@/interfaces/types";
import type { colors } from "@/lib/colors";

interface EventHandlerProps {
    articleId: string;
    color: typeof colors [keyof typeof colors];
}

export function EventHandler({ articleId, color }: EventHandlerProps) {
    const { setBgColor } = useColorStore((state) => state);

    useEffect(() => {
        const article = document.getElementById(articleId);
        if (!article) return;

        const handleMouseEnter = () => {
            setBgColor(color.accent);
        };
        
        const handleMouseLeave = () => {
            setBgColor("#30275b");
        };

        article.addEventListener("mouseenter", handleMouseEnter);
        article.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            article.removeEventListener("mouseenter", handleMouseEnter);
            article.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [articleId]);

    return null;
}
