// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/system'
import { ThemeProvider } from "next-themes";
import AntdRegistry from "@/lib/AntdRegistry";
import { useRouter } from 'next/navigation'
import { ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    return (

            <NextUIProvider>
                <AntdRegistry>
                    <ThemeProvider {...themeProps}>
                        {children}
                    </ThemeProvider>
                </AntdRegistry>
            </NextUIProvider>

    )
}
