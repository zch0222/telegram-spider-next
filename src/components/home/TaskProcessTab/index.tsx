'use client'
import { Tabs, Tab } from "@nextui-org/react";
import MediaDownloadProcess from "./MediaDownloadProcess";
import MessageSpiderProcess from "./MessageSpiderProcess";
import YoutubeDLDownloadProcess from "./YoutubeDLDownloadProcess";
import YtDlpDownloadProcess from "./YtDlpDownloadProcess";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function TaskProcessTab() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>("message_media_download_process");

    useEffect(() => {
        if (searchParams) {
            const tab = searchParams.get('process_tab');
            if (tab) {
                setSelectedTab(tab);
            }
        }
    }, [searchParams]);

    const handleTabChange = (key: React.Key) => {
        setSelectedTab(key as string);
        const params = new URLSearchParams(window.location.search);
        params.set('process_tab', key as string);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <Tabs size="sm" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
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
