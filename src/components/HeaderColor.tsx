import { useColorStore } from "@/store/colorStore";
import { useEffect, useState } from "react";
import { colors } from "@/lib/colors";

export function HeaderColor() {
    const { bgColor } = useColorStore((state) => state);
    const [gradientColor, setGradientColor] = useState<string>(
        "linear-gradient(to bottom, #30275b, transparent)"
    );

    useEffect(() => {
        const colorKey = Object.keys(colors).find(
            (key): key is keyof typeof colors =>
                colors[key as keyof typeof colors].accent === bgColor
        );
        //set default Gradient
        if (!colorKey) {
            const formatGradient = `linear-gradient(to bottom, ${bgColor}, transparent)`;
            setGradientColor(formatGradient);
            return;
        }

        //set playlist Gradient
        const formatGradient = `linear-gradient(to bottom, ${colors[colorKey].accent}, transparent)`;
        setGradientColor(formatGradient);
    }, [bgColor]);

    return (
        <div
            style={{ background: gradientColor }}
            className={`h-[30%] top-0 absolute transition-all duration-500 inset-0 bg-gradient-to-b`}
        ></div>
    );
}
