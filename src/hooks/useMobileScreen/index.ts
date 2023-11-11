'use client'
import useWindowSize from "@/hooks/useWindowSize";

export const MOBILE_MAX_WIDTH = 600;
export default function useMobileScreen() {
    const { width } = useWindowSize();

    return width <= MOBILE_MAX_WIDTH;
}
