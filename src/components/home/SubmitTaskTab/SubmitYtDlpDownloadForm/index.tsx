'use client'
import withRedux from "@/components/hoc/withRedux";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { submitYtDlp } from "@/request/client/ytDlp";
import { useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

function SubmitYtDlpDownloadForm(){

    const [url, setUrl] = useState<string>("")
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const onSubmit = () => {
        if (!url) {
            dispatch(showMessage({
                type: "error",
                content: "请输入视频链接"
            }))
            return
        }

        setSubmitLoading(true)
        submitYtDlp({
            url: url
        }).then(
            res => {
                if (res.data.code === 200 || res.data.code === 1) {
                    dispatch(showMessage({
                        type: "success",
                        content: `任务提交成功，任务ID: ${res.data.data.task_id}`
                    }))
                    setUrl("")
                } else {
                    dispatch(showMessage({
                        type: "error",
                        content: res.data.msg || "提交失败"
                    }))
                }
            }
        ).catch(err => {
            dispatch(showMessage({
                type: "error",
                content: "提交失败: " + err.message
            }))
        }).finally(
            () => {
                setSubmitLoading(false)
            }
        )
    }

    return (
        <form className="flex flex-col gap-4l">
            <div className="flex flex-row items-center mt-5">
                <div className="w-[15%] min-w-[100px] mr-5">视频链接:</div>
                <div className="flex-grow">
                    <Input
                        variant="underlined"
                        labelPlacement="outside"
                        placeholder="输入视频链接"
                        value={url}
                        onValueChange={setUrl}
                    />
                </div>
            </div>
            <div className="flex gap-2 justify-end mt-10">
                <Button onClick={onSubmit} fullWidth color="primary" isLoading={submitLoading}>
                    提交下载任务
                </Button>
            </div>
        </form>
    )
}

export default withRedux(SubmitYtDlpDownloadForm)
