'use client'
import { Tabs, Tab } from "@nextui-org/react";
import PollingLogTab from "./PollingLogTab";
import YtDlpListTab from "./YtDlpListTab";

export default function SystemLogTab() {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="System Logs">
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
