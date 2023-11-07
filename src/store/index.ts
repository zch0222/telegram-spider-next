import {AnyAction, combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import messageReducer from "@/store/message/messageSlice";
import settingModalReducer from "@/store/settingModal/settingModalSlice";
import themeReducer from "@/store/theme/themeSlice"
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { persistReducer } from 'redux-persist';


const reducer = combineReducers({
    message: messageReducer,
    settingModal: settingModalReducer,
    theme: themeReducer
});

// const persistConfig = {
//     key: 'redux',
//     storage,
//     // 黑名单 不缓存的
//     blacklist: ["message", "settingModal"]
// };

// const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
        serializableCheck: false
    })]
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
