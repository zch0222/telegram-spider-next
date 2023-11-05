import { getMessageMediaDownloadProcess } from "@/request/client/messageSpider";
import { Listbox, ListboxItem, Chip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Loading from "@/components/Loading";


export default function MediaDownloadProcess() {

    const [processList, setProcessList] = useState<string[]>([
    ])

    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        let controller = new AbortController()
        getMessageMediaDownloadProcess({
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
                    let data = JSON.parse(dataString);
                    console.log(data); // 这将输出最后一个 "data" 后的数组
                    setProcessList(data)
                }
                // const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
                // console.log(lastIndex)
            }
        }).then(r => {}).catch(
            e => {
                console.log(e)
            }
        )
        return () => {
            controller.abort()
        }
    }, [])

    if (loading) {
        return (
            <Loading/>
        )
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
                            <div>
                                {item}
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
