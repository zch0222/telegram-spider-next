'use client'
import { Input, Button, Pagination } from "@nextui-org/react";
import { useState } from "react";
import { searchMessageText } from "@/request/client/messageSpider";
import MessageCard from "@/components/home/MessageCard"
import { Message } from "@/types/messageSpiderTypes";
import {nanoid} from "nanoid";

export default function MessageSearchTab() {

    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")
    const [channel, setChannel] = useState<string>("")
    const [messageData, setMessageData] = useState<Message[]>([])
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const pageSize = 20

    const search = (pageNo: number = 1) => {
        setIsSearching(true)
        setPage(pageNo)
        searchMessageText({
            messageText: searchText || undefined,
            channel: channel || undefined,
            page: pageNo,
            page_size: pageSize
        }).then(res => {
            console.log(res)
            if (res.data.code === 200 || res.data.code === 1) {
                setMessageData(res.data.data?.list || [])
                setTotal(res.data.data?.total || 0)
            }
        }).finally(
            () => {
                setIsSearching(false)
            }
        )
    }

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className="flex flex-col justify-center items-center w-[95%] gap-4 mt-4">
                <Input
                    className="w-full"
                    label="搜索文字"
                    placeholder="输入搜索文字"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                />
                <Input
                    className="w-full"
                    label="频道"
                    placeholder="输入频道用户名 (例如 @google)"
                    value={channel}
                    onChange={(e) => {
                        setChannel(e.target.value)
                    }}
                />
                <Button className="w-full" onClick={() => search(1)} isLoading={isSearching} color="primary">搜索</Button>
            </div>

            <div className="w-full flex flex-col justify-center items-center flex-grow overflow-y-auto">
                {messageData.map(item => (
                    <div className="mt-3 w-[95%]" key={nanoid()}>
                        <MessageCard data={item}/>
                    </div>
                ))}
            </div>
            
            {total > 0 && (
                <div className="flex justify-center w-full py-4">
                    <Pagination 
                        total={Math.ceil(total / pageSize)} 
                        page={page} 
                        onChange={(page) => search(page)}
                        showControls
                    />
                </div>
            )}
        </div>
    )
}
