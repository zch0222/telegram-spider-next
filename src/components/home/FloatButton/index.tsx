'use client'
import { FloatButton as AntdFloatButton } from "antd";
import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider"
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSettingModal } from "@/store/settingModal/settingModalSlice";
import { setTheme as setGlobalTheme } from "@/store/theme/themeSlice";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { useTheme } from "next-themes";
import {Image} from "@nextui-org/image";
import moonSVG from '@/../public/moon.svg'
import {RootState} from "@/store";
import {useEffect} from "react";

function FloatButton() {

    const dispatch = useDispatch()


    const theme = useSelector((state: RootState) => state.theme)



    return (
        <AntdFloatButton.Group>
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
