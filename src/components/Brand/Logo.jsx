import { useTheme } from "../../hooks/useTheme";
import logoPink from "../../assets/brand/romi_lrgpink.png";
import logoBlack from "../../assets/brand/romi_lrgblack.png";

const VARIANT_ASSET = {
    horizontal: {
        light: logoBlack,
        dark: logoPink,
    },
    vertical: {
        light: logoBlack,
        dark: logoPink,
    },
};

const SIZE_WIDTH = {
    sm: 140,
    md: 180,
    lg: 220,
};

export default function Logo({
    variant = "horizontal",
    size = "md",
    theme = "auto",
    alt = "Romi Mente",
    className = "",
}) {
    const { theme: systemTheme } = useTheme();
    const resolvedTheme = theme === "auto" ? systemTheme : theme;
    const asset = VARIANT_ASSET[variant]?.[resolvedTheme] || logoPink;
    const width = SIZE_WIDTH[size] ?? SIZE_WIDTH.md;

    return (
        <img
            src={asset}
            alt={alt}
            className={className}
            style={{ width, height: "auto" }}
            loading="lazy"
        />
    );
}
