'use client'
import { useState, useEffect } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState<{
        width: number | undefined,
        height: number | undefined
    }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const onResize = () => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener("resize", onResize);
            onResize();

            return () => {
                window.removeEventListener("resize", onResize);
            };
        }
    }, []);



    return size;
}
