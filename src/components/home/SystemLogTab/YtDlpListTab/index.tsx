'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Progress, Spinner } from "@nextui-org/react";
import { getYtDlpList } from "@/request/client/ytDlp";
import { YtDlpTask } from "@/types/youtubeDLType";
import useMobileScreen from "@/hooks/useMobileScreen";
import { showMessage } from "@/store/message/messageSlice";
import { useDispatch } from "react-redux";

export default function YtDlpListTab() {
    const isMobile = useMobileScreen();
    const dispatch = useDispatch();
    const [tasks, setTasks] = useState<YtDlpTask[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getYtDlpList();
                if (res.data.code === 200 || res.data.code === 1) {
                    setTasks(res.data.data);
                } else {
                    dispatch(showMessage({ type: "error", content: res.data.msg || "获取任务列表失败" }));
                }
            } catch (error: any) {
                dispatch(showMessage({ type: "error", content: error.message || "获取任务列表失败" }));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const renderStatus = (status: string) => {
        switch (status) {
            case 'downloading':
                return <Chip color="primary" size="sm" variant="flat">下载中</Chip>;
            case 'completed':
                return <Chip color="success" size="sm" variant="flat">已完成</Chip>;
            case 'failed':
                return <Chip color="danger" size="sm" variant="flat">失败</Chip>;
            default:
                return <Chip size="sm" variant="flat">{status}</Chip>;
        }
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: '标题/URL' },
        { key: 'status', label: '状态' },
        { key: 'progress', label: '进度' },
        ...(isMobile ? [] : [
            { key: 'file_path', label: '文件路径' },
            { key: 'created_at', label: '创建时间' }
        ])
    ];

    const renderCell = useCallback((item: YtDlpTask, columnKey: React.Key) => {
        switch (columnKey) {
            case 'id':
                return item.id;
            case 'title':
                return (
                    <div className="flex flex-col">
                        <span className="text-small font-bold">{item.title || '无标题'}</span>
                        <span className="text-tiny text-default-400 truncate max-w-[150px] sm:max-w-[300px]">{item.url}</span>
                    </div>
                );
            case 'status':
                return renderStatus(item.status);
            case 'progress':
                 return (
                    <Progress 
                        size="sm"
                        value={item.progress || 0}
                        color={item.status === 'failed' ? 'danger' : 'primary'}
                        showValueLabel={true}
                        className="max-w-[100px]"
                    />
                );
            case 'file_path':
                return <div className="max-w-[200px] truncate" title={item.file_path}>{item.file_path || '-'}</div>;
            case 'created_at':
                return <div className="whitespace-nowrap">{item.created_at}</div>;
            default:
                return item[columnKey as keyof YtDlpTask];
        }
    }, []);

    return (
        <Table 
            aria-label="Yt-Dlp Task List"
            classNames={{
                wrapper: "max-h-[600px]",
            }}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody 
                items={tasks}
                loadingContent={<Spinner />}
                isLoading={loading}
                emptyContent={"暂无任务数据"}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
