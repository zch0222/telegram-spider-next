'use client'
import {Button, Input, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure, Tab, Tabs} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { showMessage } from "@/store/message/messageSlice";

import {useState} from "react";
import { submitMessageSpiderTask } from "@/request/client/messageSpider";
import SubmitMessageMediaDownloadForm from "./SubmitMessageMediaDownloadForm";
import SubmitYoutubeDLDownloadForm from "@/components/home/SubmitTaskTab/SubmitYoutubeDLDownloadForm";
import withThemeConfigProvider from "../../hoc/withThemeConfigProvider";
import withRedux from "@/components/hoc/withRedux";

function SubmitTaskTab() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<string>("")
    const [data, setData] = useState<{
        channel: string,
        min_id: number
    }>({
        channel: "",
        min_id: 0
    })
    const dispatch = useDispatch()
    // const [messageApi, contextHolder] = message.useMessage();

    const onSubmit = async () => {
        if (!data.channel || "" === data.channel) {
            dispatch(showMessage({
                type: "info",
                content: "请输入频道地址"
            }))
            // messageApi.info("请输入频道地址")
            return;
        }
        if (0 === data.min_id) {
            dispatch(showMessage({
                type: "info",
                content: "请输入最小id"
            }))
            // messageApi.info("请输入最小id")
            // setModalContent()
            // onOpen()
            return;
        }
        setSubmitLoading(true)
        submitMessageSpiderTask(data).then(
            res => dispatch(showMessage({
                type: "success",
                content: "任务提交成功"
            }))
        ).finally(
            () => {
                setSubmitLoading(false)
            }
        )
    }

    return (
        <div className="min-h-[265px]">
            {/*{contextHolder}*/}
            <Tabs size="sm">
                <Tab key="submit_message_spider" title="抓取信息任务">
                    <form className="flex flex-col gap-4l">
                        <div className="flex flex-row items-center mt-5">
                            <div className="w-[15%] min-w-[100px] mr-5">频道地址:</div>
                            <div className="flex-grow">
                                <Input
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            channel: e.target.value
                                        })
                                    }}
                                    placeholder="输入频道地址"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center mt-5">
                            <div className="w-[15%] min-w-[100px] mr-5">开始消息ID:</div>
                            <div className="flex-grow">
                                <Input
                                    placeholder="输入开始消息ID"
                                    type="number"
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            min_id: Number(e.target.value)
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end mt-10">
                            <Button onClick={onSubmit} fullWidth color="primary" isLoading={submitLoading}>
                                开始
                            </Button>
                        </div>
                    </form>
                </Tab>
                <Tab key="submit_message_media_download" title="媒体下载">
                    <SubmitMessageMediaDownloadForm/>
                </Tab>
                <Tab key="submit_youtube_dl_download" title="YoutubeDL">
                    <SubmitYoutubeDLDownloadForm/>
                </Tab>
            </Tabs>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">提示</ModalHeader>
                    <div className="flex justify-center items-center w-full h-[80px]">
                        {modalContent}
                    </div>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default withRedux(withThemeConfigProvider(SubmitTaskTab))
