import { Card, CardBody, Link, CardFooter, CardHeader } from "@nextui-org/react";
import { Message } from "@/types/messageSpiderTypes";


export default function MessageCard({data}: {
    data: Message
}) {

    const { channel, message_text, create_time, update_time, link } = data;

    return (
        <Card>
            <CardHeader>
                频道地址: {channel}
            </CardHeader>
            <CardBody>
                {message_text}
            </CardBody>
            <CardFooter>
                <div>创建时间: {create_time}</div>
                <div>更新时间: {update_time}</div>
                <Link href={link} target="_blank">查看详情</Link>
            </CardFooter>
        </Card>
    );
}
