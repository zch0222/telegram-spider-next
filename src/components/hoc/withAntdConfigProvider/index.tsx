import { ConfigProvider, theme } from "antd";
import React, {ComponentType} from "react";

export default function withAntdConfigProvider(Component: ComponentType<any>) {
    return function AntdComponent(props: any) {
        return (
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm
                }}
            >
                <Component {...props}/>
            </ConfigProvider>
        )
    }
}
