'use client'
import { Input, Button } from "@nextui-org/react";
import {useEffect, useState, useRef} from "react";
import {nanoid} from "nanoid";

import ChatText from "@/components/chat-pdf/Chat/ChatText";
import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";

import { chat } from "@/request/client/chatPDF";

function Chat({ pdfUrl }: {
    pdfUrl: string
}) {

    let controller = new AbortController()

    const [isChatting, setIsChatting] = useState<boolean>(false)
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState<{
        id: string,
        message: string,
        role: "user" | "bot"
    }[]>([])

    const isChatBegin = useRef<boolean>(false)



    useEffect(() => {
        if (!isChatBegin.current) {
            return
        }
        isChatBegin.current = false

        const question = prompt
        setPrompt("")
        const match = pdfUrl.match(/\/([^\/]*\.pdf)/)
        if (match) {
            console.log(match[1]);
        }
        const fileKey = match?.[1].replace(".", "_")
        if (!fileKey) {
            return;
        }
        console.log(fileKey)
        chat({
            signal: controller.signal,
            data: {
                url: pdfUrl,
                user_id: 1,
                question: question,
                file_key: fileKey
            },
            onDownloadProcess: ({ event }: {event: any}) => {

                const responseText = event.target.responseText
                // console.log(responseText)
                const parts = responseText.split("\n\n")
                // console.log(parts)
                const last = parts[parts.length-2]
                const newMessages = messages
                console.log(newMessages)
                const lastParts = last.split("\n")
                // console.log(lastParts)
                newMessages[newMessages.length-1] = {
                    id: nanoid(),
                    message: JSON.parse(lastParts[2].substring(6)).data.message,
                    role: "bot"
                }
                console.log(newMessages)
                setMessages([
                    ...newMessages
                ])
            }
        }).catch(
            e => console.log(e)
        ).finally(
            () => {
                setIsChatting(false)
            }
        )
    }, [messages])


    const send = () => {
        if (!prompt || "" === prompt) {
            return
        }
        setIsChatting(true)
        setMessages([
            ...messages,
            {
                id: nanoid(),
                message: prompt,
                role: "user"
            },
            {
                id: nanoid(),
                message: "",
                role: "bot"
            }
        ])
        isChatBegin.current = true
    }




    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-grow flex flex-col overflow-y-auto">
                {messages.map(item => (
                    <ChatText
                        key={item.id}
                        text={item.message}
                        role={item.role}
                    />
                ))}
            </div>
            <div className="flex flex-row">
                <Input
                    className="mr-2"
                    placeholder={"请输入问题"}
                    onValueChange={setPrompt}
                    value={prompt}
                />
                <Button
                  color="primary"
                  onClick={send}
                  isLoading={isChatting}
                >
                    发送
                </Button>
            </div>
        </div>
    )
}

export default withThemeConfigProvider(Chat)
