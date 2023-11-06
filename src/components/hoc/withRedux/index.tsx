import { Provider } from 'react-redux'
import store from "@/store";
import React, {ComponentType} from "react";


export default function withRedux(Component: ComponentType<any>) {
    return function ReduxComponent(props: any) {
        return (
            <Provider store={store}>
                <Component {...props}/>
            </Provider>
        )
    }
}
