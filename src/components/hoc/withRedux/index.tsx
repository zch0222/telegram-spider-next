import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store from "@/store";
import React, {ComponentType} from "react";
import { persistStore } from 'redux-persist';

export default function withRedux(Component: ComponentType<any>) {
    const persistor = persistStore(store);
    return function ReduxComponent(props: any) {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...props}/>
                </PersistGate>

            </Provider>
        )
    }
}
