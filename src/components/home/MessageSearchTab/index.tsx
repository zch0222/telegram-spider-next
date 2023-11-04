'use client'
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { searchMessageText } from "@/request/client/messageSpider";
import MessageCard from "@/components/home/MessageCard"
import { Message } from "@/types/messageSpiderTypes";
import {nanoid} from "nanoid";

export default function MessageSearchTab() {

    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")
    const [messageData, setMessageData] = useState<Message[]>([])

    const search = () => {
        console.log(searchText)
        if (!searchText || "" === searchText) {
            return;
        }
        setIsSearching(true)
        searchMessageText({messageText: searchText}).then(res => {
            console.log(res)
            setMessageData(res.data.data)
        }).finally(
            () => {
                setIsSearching(false)
            }
        )
    }

    return (
        <div className="flex flex-col items-center h-full">
            <div className="flex flex-row justify-center items-center w-full">
                <Input
                    className="mr-2 mt-2 flex-grow"
                    placeholder="输入搜索文字"
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                />
                <Button onClick={search} isLoading={isSearching} color="primary">搜索</Button>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
                {messageData.map(item => (
                    <div className="mt-3 w-[95%]" key={nanoid()}>
                        <MessageCard data={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
