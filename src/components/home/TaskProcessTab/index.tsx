import { Tabs, Tab } from "@nextui-org/react";
import MediaDownloadProcess from "@/components/home/MediaDownloadProcess";

export default function TaskProcessTab() {
    return (
        <div>
            <Tabs size="sm">
                <Tab key="message_media_download_process" title="消息媒体下载">
                    <MediaDownloadProcess/>
                </Tab>
                <Tab key="message_spider_process" title="消息爬取">

                </Tab>
            </Tabs>
        </div>
    )
}
