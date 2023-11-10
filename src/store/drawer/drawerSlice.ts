import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
    isOpen: boolean
}

const initialState: DrawerState = {
    isOpen: false
}

export const drawerSlice = createSlice({
    name: "drawerSlice",
    initialState,
    reducers: {
        setDrawer: (state, action: PayloadAction<DrawerState>) => {
            return action.payload
        }
    }
})

export const { setDrawer } = drawerSlice.actions

export default drawerSlice.reducer
