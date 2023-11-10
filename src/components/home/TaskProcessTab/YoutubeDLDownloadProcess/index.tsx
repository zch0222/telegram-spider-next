'use client'
import { Listbox, ListboxItem, Chip } from "@nextui-org/react";
import {nanoid} from "nanoid";
import {useEffect, useState} from "react";
import { YoutubeDLDownloadProcess } from "@/types/youtubeDLType";
import { getYoutubeDLDownloadProcess } from "@/request/client/youtubeDL";
import Loading from "@/components/Loading";


export default function YoutubeDLDownloadProcess() {
    const [processList, setProcessList] = useState<YoutubeDLDownloadProcess[]>([
    ])

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        let controller = new AbortController()
        getYoutubeDLDownloadProcess({
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
                    const newProcessList: YoutubeDLDownloadProcess[] = []
                    data.forEach(item => {
                        newProcessList.push(JSON.parse(item))
                    })
                    setProcessList(newProcessList)
                }
            }
        }).catch(
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
            <Listbox variant="bordered" aria-labelledby="listbox-label">
                {processList.map(item => (
                    <ListboxItem
                        key={nanoid()}
                        textValue="donwload process"
                    >
                        <div className="flex flex-row justify-between items-center">
                            <div className="w-[70%] overflow-hidden">
                                {item.url_list}
                            </div>
                            <div>
                                <Chip color="primary">下载中</Chip>
                            </div>
                        </div>
                    </ListboxItem>
                ))}
            </Listbox>
        </>
    )
}
