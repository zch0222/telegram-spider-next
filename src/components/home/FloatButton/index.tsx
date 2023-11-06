import { FloatButton as AntdFloatButton } from "antd";
import withRedux from "@/components/hoc/withRedux";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setIsOpenSettingModal } from "@/store/settingModal/settingModalSlice";

function FloatButton() {

    const dispatch = useDispatch()

    return (
        <AntdFloatButton
            icon={<SettingOutlined/>}
            onClick={() => {
                dispatch(setIsOpenSettingModal(true))
            }}
        />
    )
}

export default withRedux(FloatButton)
