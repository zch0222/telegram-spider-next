'use client'
import {Button, Input} from "@nextui-org/react";
import { useState } from "react";
import { submitMessageMediaDownload } from "@/request/client/messageSpider";

export default function SubmitMessageMediaDownloadForm() {

    const [data, setData] = useState<{message_link: string}>({
        message_link: ""
    })
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const onSubmit = () => {
        setSubmitLoading(true)
        submitMessageMediaDownload(data).then(res => {

        }).finally(
            () => setSubmitLoading(false)
        )
    }

    return (
        <>
            <form className="flex flex-col gap-4l">
                <div className="flex flex-row items-center mt-5">
                    <div className="w-[15%] min-w-[100px] mr-5">消息链接:</div>
                    <div className="flex-grow">
                        <Input
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    message_link: e.target.value
                                })
                            }}
                            placeholder="请输入消息链接"
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-10">
                    <Button onClick={onSubmit} fullWidth color="primary" isLoading={submitLoading}>
                        下载
                    </Button>
                </div>
            </form>
        </>
    )
}
