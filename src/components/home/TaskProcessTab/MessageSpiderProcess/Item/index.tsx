import { Progress } from 'antd';
import { MessageSpiderProcess } from "@/types/messageSpiderTypes";
import { useMemo } from "react";

export default function Item({data}: {
    data: MessageSpiderProcess
}) {


    return (
        <div className="flex flex-col">
            <div>{data.channel}</div>
            <div>
                <Progress percent={50}/>
            </div>
        </div>
    )
}
