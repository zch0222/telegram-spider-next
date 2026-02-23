import { Tabs, Tab } from "@nextui-org/react";
import MediaDownloadProcess from "./MediaDownloadProcess";
import MessageSpiderProcess from "./MessageSpiderProcess";
import YoutubeDLDownloadProcess from "./YoutubeDLDownloadProcess";
import YtDlpDownloadProcess from "./YtDlpDownloadProcess";

export default function TaskProcessTab() {
    return (
        <div>
            <Tabs size="sm">
                <Tab key="message_media_download_process" title="消息媒体下载">
                    <MediaDownloadProcess/>
                </Tab>
                <Tab key="message_spider_process" title="消息爬取">
                    <MessageSpiderProcess/>
                </Tab>
                <Tab key="youtube_dl_download_process" title="YoutubeDL">
                    <YoutubeDLDownloadProcess/>
                </Tab>
                <Tab key="yt_dlp_download_process" title="yt-dlp下载进度">
                    <YtDlpDownloadProcess/>
                </Tab>
            </Tabs>
        </div>
    )
}
