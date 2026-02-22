// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/system'
import { ThemeProvider } from "next-themes";
import AntdRegistry from "@/lib/AntdRegistry";
import { useRouter } from 'next/navigation'
import { Provider } from 'react-redux'
import store from "@/store";
import { ThemeProviderProps } from "next-themes/dist/types";
import React from "react";
import AuthGuard from "@/components/AuthGuard";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();
    return (
        <Provider store={store}>
            <NextUIProvider>
                <AntdRegistry>
                    <ThemeProvider {...themeProps}>
                        <AuthGuard>
                            {children}
                        </AuthGuard>
                    </ThemeProvider>
                </AntdRegistry>
            </NextUIProvider>
        </Provider>


    )
}
