'use client'
import { message } from "antd";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider";
import withRedux from "@/components/hoc/withRedux"
import {useEffect} from "react";

function Message() {
    const [messageApi, contextHolder] = message.useMessage();
    const messageArgs = useSelector((state: RootState) => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
        if (messageArgs.content) {
            messageApi.open(messageArgs).then(r => {})
            showMessage({
                content: null
            })
        }
    }, [messageArgs])

    return (
        <>
            {contextHolder}
        </>
    )
}

export default withRedux(withAntdConfigProvider(Message))
