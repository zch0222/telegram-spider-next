'use client'
import {Modal, ModalContent, ModalBody, Card, ModalHeader, Chip, Button} from "@nextui-org/react";
import withRedux from "@/components/hoc/withRedux";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenSettingModal } from "@/store/settingModal/settingModalSlice";
import { showMessage } from "@/store/message/messageSlice";
import { restart, getServerStatus } from "@/request/client/messageSpider";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

function SettingModal() {

    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.settingModal)
    const [isRestarting, setIsRestarting] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [isRunning, setIsRunning] = useState<boolean>(false)

    useEffect(() => {
        if (isOpen === false) {
            return
        }
        let controller = new AbortController()
        getServerStatus({
            signal: controller.signal,
            onDownloadProcess: ({ event }: { event: any }) => {
                const responseText = event.target.responseText
                let match = responseText.match(/(\{"code": 1, "msg": "", "data": "RUNNING"\})[^{]*$/);
                console.log(responseText)
                console.log(match)
                if (match && match.length > 0) {
                    if (loading) {
                        console.log("fa")
                        setLoading(false)
                    }
                    let lastMatch = match[match.length - 1];
                    let dataString = lastMatch.replace('data: ', '').trim();
                    let data = JSON.parse(dataString);
                    console.log(data); // 这将输出最后一个 "data" 后的数组
                    setIsRunning(true)
                }
            }
        }).catch(
            e => {
                setIsRunning(false)
            }
        )
        return () => {
            controller.abort()
        }
    }, [isOpen])

    const restartServer = async () => {
        setIsRestarting(true)
        restart().then(
            res => {
                dispatch(showMessage({
                    type: "success",
                    content: "成功发送重启请求"
                }))
            }
        )
        setIsRestarting(false)
    }

    return (
        <Modal
            backdrop="blur"
            onClose={() => dispatch(setIsOpenSettingModal(false))}
            isOpen={isOpen}
        >

            <ModalContent className="h-[250px]">
                <ModalHeader>
                    系统设置
                </ModalHeader>
                <ModalBody>
                    { loading ? <Loading/> :
                        <div className="flex flex-col justify-between h-full pb-5">
                            <div className="flex flex-row justify-between items-center">
                                <div>系统状态</div>
                                <Chip color={isRunning ? "success" : "danger"}>
                                    {isRunning ? "正常" : "未启动"}
                                </Chip>
                            </div>
                            <Button onClick={restartServer} isLoading={isRestarting} color="primary">重启</Button>
                        </div>
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default withRedux(SettingModal)
