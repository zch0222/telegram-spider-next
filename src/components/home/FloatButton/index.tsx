'use client'
import { FloatButton as AntdFloatButton } from "antd";
import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider"
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSettingModal } from "@/store/settingModal/settingModalSlice";
import { setTheme as setGlobalTheme } from "@/store/theme/themeSlice";
import { SwitcherOutlined } from "@ant-design/icons"
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import {Image} from "@nextui-org/image";
import moonSVG from '@/../public/moon.svg'
import {RootState} from "@/store";
import { setDrawer } from "@/store/drawer/drawerSlice";
import {useEffect} from "react";

function FloatButton() {

    const dispatch = useDispatch()

    const drawer = useSelector((state: RootState) => state.drawer)
    const theme = useSelector((state: RootState) => state.theme)



    return (
        <AntdFloatButton.Group>
            <AntdFloatButton
                icon={<SwitcherOutlined/>}
                onClick={() => {
                    console.log(655656)
                    dispatch(setDrawer({
                        isOpen: true
                    }))
                }}
            />
            <AntdFloatButton
                type={"dark" === theme ? "primary" : "default"}
                icon={<Image src="./moon.svg"/>}
                onClick={() => {
                    if ("light" === theme) {
                        dispatch(setGlobalTheme("dark"))
                    }
                    else {
                        dispatch(setGlobalTheme("light"))
                    }

                }}
            />
            <AntdFloatButton
                icon={<SettingOutlined/>}
                onClick={() => {
                    dispatch(setIsOpenSettingModal(true))
                }}
            />
        </AntdFloatButton.Group>
    )
}

export default withAntdConfigProvider(FloatButton)
