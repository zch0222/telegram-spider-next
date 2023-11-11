'use client'
import { ConfigProvider, theme as antdTheme } from "antd";
import React, {ComponentType} from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function withThemeConfigProvider(Component: ComponentType<any>) {
    return function AntdComponent(props: any) {
        const globalTheme = useSelector((state: RootState) => state.theme)
        const { theme, setTheme } = useTheme()

        useEffect(() => {
            console.log(globalTheme)
            setTheme(globalTheme)
        }, [globalTheme])

        return (
            <ConfigProvider
                theme={{
                    algorithm: globalTheme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
                }}
            >
                <Component {...props}/>
            </ConfigProvider>
        )
    }
}
