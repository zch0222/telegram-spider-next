'use client'
import withRedux from "@/components/hoc/withRedux";
import {Button, Input} from "@nextui-org/react";
import { YoutubeDLSubmitDTO } from "@/types/youtubeDLType";
import { useState } from "react";
import {Textarea} from "@nextui-org/react";
import { submitYoutubeDL } from "@/request/client/youtubeDL";
import { useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

function SubmitYoutubeDLDownloadForm(){

    const [data, setData] = useState<YoutubeDLSubmitDTO>({
        url_list: []
    })
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [textAreaValue, setTextAreaValue] = useState<string>("")
    const dispatch = useDispatch()

    const onSubmit = () => {
        setSubmitLoading(true)
        submitYoutubeDL({
            url_list: textAreaValue.split("\n")
        }).then(
            res => dispatch(showMessage({
                type: "success",
                content: res.data.data
            }))
        ).finally(
            () => {
                setSubmitLoading(false)
            }
        )
    }

    return (
        <form className="flex flex-col gap-4l">
            <div className="flex flex-row items-center mt-5">
                <div className="w-[15%] min-w-[100px] mr-5">消息链接:</div>
                <div className="flex-grow">
                    <Textarea
                        variant="underlined"
                        labelPlacement="outside"
                        placeholder="输入视频链接"
                        value={textAreaValue}
                        onValueChange={setTextAreaValue}
                    />
                </div>
            </div>
            <div className="flex gap-2 justify-end mt-10">
                <Button onClick={onSubmit} fullWidth color="primary" isLoading={submitLoading}>
                    下载
                </Button>
            </div>
        </form>
    )
}

export default withRedux(SubmitYoutubeDLDownloadForm)
