'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress, Chip } from "@nextui-org/react";
import { getYtDlpProcessUrl } from "@/request/client/ytDlp";
import { YtDlpProcess } from "@/types/youtubeDLType";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const YtDlpDownloadProcess = () => {
    const [tasks, setTasks] = useState<YtDlpProcess[]>([]);
    const eventSourceRef = useRef<EventSource | null>(null);
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
            return;
        }

        const connectSSE = () => {
            const url = getYtDlpProcessUrl();
            const eventSource = new EventSource(url, { withCredentials: true });
            eventSourceRef.current = eventSource;

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    // data should be an array of tasks
                    if (Array.isArray(data)) {
                         setTasks(data);
                    }
                } catch (error) {
                    console.error("Failed to parse SSE message", error);
                }
            };

            eventSource.onerror = (error) => {
                console.error("SSE error", error);
                eventSource.close();
                // Reconnect after 3 seconds if connection is lost
                setTimeout(() => {
                    if (isLoggedIn) {
                         connectSSE();
                    }
                }, 3000);
            };
        };

        connectSSE();

        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, [isLoggedIn]);

    const renderStatus = (status: string) => {
        switch (status) {
            case 'downloading':
                return <Chip color="primary" variant="flat">下载中</Chip>;
            case 'completed':
                return <Chip color="success" variant="flat">已完成</Chip>;
            case 'failed':
                return <Chip color="danger" variant="flat">失败</Chip>;
            default:
                return <Chip color="default" variant="flat">等待中</Chip>;
        }
    };

    return (
        <div className="w-full">
            <Table aria-label="YT-DLP Download Tasks">
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>标题/URL</TableColumn>
                    <TableColumn>状态</TableColumn>
                    <TableColumn>进度</TableColumn>
                    <TableColumn>速度</TableColumn>
                    <TableColumn>剩余时间</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"暂无下载任务"}>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.id}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="text-small font-bold">{task.title || '获取中...'}</span>
                                    <span className="text-tiny text-default-400 truncate max-w-[300px]">{task.url}</span>
                                </div>
                            </TableCell>
                            <TableCell>{renderStatus(task.status)}</TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1 w-full max-w-md">
                                    <Progress 
                                        size="sm"
                                        value={task.progress || 0}
                                        color={task.status === 'failed' ? 'danger' : 'primary'}
                                        showValueLabel={true}
                                        className="max-w-md"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>{task.speed || '-'}</TableCell>
                            <TableCell>{task.eta || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default YtDlpDownloadProcess;
