'use client'
import { Tabs, Tab } from "@nextui-org/react";
import PollingLogTab from "./PollingLogTab";
import YtDlpListTab from "./YtDlpListTab";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

export default function SystemLogTab() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [selectedTab, setSelectedTab] = useState<string>("polling_log");

    useEffect(() => {
        if (searchParams) {
            const tab = searchParams.get('log_tab');
            if (tab) {
                setSelectedTab(tab);
            }
        }
    }, [searchParams]);

    const handleTabChange = (key: React.Key) => {
        setSelectedTab(key as string);
        const params = new URLSearchParams(window.location.search);
        params.set('log_tab', key as string);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="System Logs" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
                <Tab key="polling_log" title="轮询日志">
                    <PollingLogTab />
                </Tab>
                <Tab key="yt_dlp_list" title="Yt-DLP任务列表">
                    <YtDlpListTab />
                </Tab>
            </Tabs>
        </div>
    );
}
