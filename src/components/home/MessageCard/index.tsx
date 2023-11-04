import { Card, CardBody, Link, CardFooter, CardHeader } from "@nextui-org/react";
import { Message } from "@/types/messageSpiderTypes";


export default function MessageCard({data}: {
    data: Message
}) {

    const { channel, date, message_text, create_time, update_time, link, channel_name, sender_username } = data;

    return (
        <Card>
            <CardHeader className="flex flex-col items-start p-5">
                <div className="text-base font-bold">
                    {channel_name}
                </div>
                <div>频道地址: {channel}</div>
            </CardHeader>
            <CardBody>
                <div className="mb-1">
                    {sender_username}:
                </div>
                <div>
                    {message_text}
                </div>
            </CardBody>
            <CardFooter className="p-5">
                <div className="flex flex-col">
                    <div>消息时间：{`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}</div>
                    <Link href={link} target="_blank">查看详情</Link>
                </div>
            </CardFooter>
        </Card>
    );
}
