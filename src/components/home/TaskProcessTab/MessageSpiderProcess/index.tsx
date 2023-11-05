'use client'
import { Listbox, ListboxItem, Chip } from "@nextui-org/react";
import {Progress, ConfigProvider, theme} from "antd";
import { MessageSpiderProcess } from "@/types/messageSpiderTypes";
import {getMessageSpiderProcess} from "@/request/client/messageSpider";
import {useEffect, useState, useMemo} from "react";
import { nanoid } from "nanoid";
import Loading from "@/components/Loading";
import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider";
import Item from "@/components/home/TaskProcessTab/MessageSpiderProcess/Item";


function MessageSpiderProcess() {

    const [processList, setProcessList] = useState<MessageSpiderProcess[]>([])

    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        let controller = new AbortController()
        getMessageSpiderProcess({
            signal: controller.signal,
            onDownloadProcess: ({event}: { event: any }) => {
                const responseText = event.target.responseText
                let match = responseText.match(/data: (\[.*?\])\n/g);
                if (match && match.length > 0) {
                    if (loading) {
                        setLoading(false)
                    }
                    let lastMatch = match[match.length - 1];
                    let dataString = lastMatch.replace('data: ', '').trim();
                    let data: string[] = JSON.parse(dataString);
                    console.log(data); // 这将输出最后一个 "data" 后的数组
                    const newProcessList: MessageSpiderProcess[] = []
                    data.forEach(item => {
                        newProcessList.push(JSON.parse(item))
                    })
                    setProcessList(newProcessList)
                }
            }
        }).then(r =>
        {}
        ).catch(
            e => {
                console.log(e)
            }
        )

        return () => {
            controller.abort()
        }

    }, [])

    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Listbox variant="bordered" aria-labelledby="message-spider-process-listbox">
                {processList.map(item => {
                    return (
                        <ListboxItem key={nanoid()} textValue="message-spider-process-item">
                            <div className="flex flex-col">
                                <div>{`${item.name} (${item.currentMessageId})`}</div>
                                <div>
                                    <Progress
                                        status= {item.percent === 100 ? "success" : "active"}
                                        size={["92%", 20]}
                                        percent={Number(item.percent?.toFixed(2))}
                                    />
                                </div>
                            </div>
                        </ListboxItem>
                    )
                })}
            </Listbox>
        </>
    )
}

export default withAntdConfigProvider(MessageSpiderProcess)
