import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false

export const settingModalSlice = createSlice({
    name: "settingModalSlice",
    initialState,
    reducers: {
        setIsOpenSettingModal: (state, action: PayloadAction<boolean>) => {
            return action.payload
        }
    }
})

export const { setIsOpenSettingModal } = settingModalSlice.actions

export default settingModalSlice.reducer
