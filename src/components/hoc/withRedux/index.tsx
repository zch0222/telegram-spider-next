import { Provider } from 'react-redux'
import store from "@/store";
import React, {ComponentType} from "react";
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// import Loading from "@/components/Loading";


export default function withRedux(Component: ComponentType<any>) {
    // const persistor = persistStore(store);
    return function ReduxComponent(props: any) {
        return (
            <Provider store={store}>
                {/*<PersistGate loading={<Loading/>} persistor={persistor}>*/}
                {/*    */}
                {/*</PersistGate>*/}
                <Component {...props}/>
            </Provider>
        )
    }
}
