'use client'
import {Card, CardBody, Tabs, Tab} from "@nextui-org/react";
import useMobileScreen from "@/hooks/useMobileScreen";
import ChatList from "@/components/gpt/ChatList";


export default function GPTPage() {

    const isMobile = useMobileScreen()

    let cardClass: string = ""
    if (isMobile) {
        cardClass = "w-full h-full"
    }
    else {
        cardClass = "max-w-full w-[80%] h-[85%] min-h-[385px] box-border max-w-[1500px] min-w-[250px]"
    }


    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className={cardClass}>
                <div className="flex flex-row w-full h-full">
                    <ChatList/>
                </div>
            </Card>
        </div>
    )
}
