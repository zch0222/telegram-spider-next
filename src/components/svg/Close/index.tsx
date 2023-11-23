'use client'
import { useTheme } from "next-themes";

export default function Close(props: {
    width: number,
    height: number
}) {

    const {theme} = useTheme()

    return (
        <svg
            style={{
                color: 'var(--color-text)'
            }}
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4055"
            width={props.width}
            height={props.height}
        >
            <path
                fill={theme === 'dark' ? 'white' : 'black'}
                d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM512 832c-179.2 0-320-140.8-320-320s140.8-320 320-320 320 140.8 320 320S691.2 832 512 832z"
                p-id="4040"></path>
            <path
                fill={theme === 'dark' ? 'white' : 'black'}
                d="M672 352c-12.8-12.8-32-12.8-44.8 0L512 467.2 396.8 352C384 339.2 364.8 339.2 352 352S339.2 384 352 396.8L467.2 512 352 627.2c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L512 556.8l115.2 115.2c12.8 12.8 32 12.8 44.8 0s12.8-32 0-44.8L556.8 512l115.2-115.2C684.8 384 684.8 364.8 672 352z"
                p-id="4041"></path>
        </svg>
    )
}
