'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Select, SelectItem, Pagination, Spinner, Chip } from "@nextui-org/react";
import { searchPollingLog } from "@/request/client/systemLog";
import { PollingLogItem, PollingLogSearchDTO } from "@/types/systemLogTypes";
import useMobileScreen from "@/hooks/useMobileScreen";
import { showMessage } from "@/store/message/messageSlice";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const levels = [
    { label: "全部", value: "" },
    { label: "INFO", value: "INFO" },
    { label: "WARNING", value: "WARNING" },
    { label: "ERROR", value: "ERROR" },
];

export default function PollingLogTab() {
    const isMobile = useMobileScreen();
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [logs, setLogs] = useState<PollingLogItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchParamsState, setSearchParamsState] = useState<PollingLogSearchDTO>({
        page: 1,
        page_size: 20,
        level: undefined,
        keyword: ""
    });

    // 初始化参数
    useEffect(() => {
        if (searchParams) {
            const levelParam = searchParams.get('polling_level') as 'INFO' | 'WARNING' | 'ERROR' | undefined;
            const keywordParam = searchParams.get('polling_keyword');
            const pageParam = searchParams.get('polling_page');

            setSearchParamsState(prev => ({
                ...prev,
                level: levelParam || undefined,
                keyword: keywordParam || "",
                page: pageParam ? Number(pageParam) : 1
            }));
        }

        // 卸载时清理参数
        return () => {
            const params = new URLSearchParams(window.location.search);
            let hasChange = false;
            if (params.has('polling_level')) { params.delete('polling_level'); hasChange = true; }
            if (params.has('polling_keyword')) { params.delete('polling_keyword'); hasChange = true; }
            if (params.has('polling_page')) { params.delete('polling_page'); hasChange = true; }
            
            if (hasChange) {
                window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
            }
        };
    }, []);

    // 更新 URL 参数
    const updateUrlParams = (newState: PollingLogSearchDTO) => {
        // 使用 window.location.search 获取最新的 URL 参数，而不是依赖可能旧的 searchParams
        const params = new URLSearchParams(window.location.search);
        
        if (newState.level) params.set('polling_level', newState.level);
        else params.delete('polling_level');

        if (newState.keyword) params.set('polling_keyword', newState.keyword);
        else params.delete('polling_keyword');

        if (newState.page && newState.page > 1) params.set('polling_page', newState.page.toString());
        else params.delete('polling_page');

        router.replace(`${pathname}?${params.toString()}`);
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await searchPollingLog(searchParamsState);
            if (res.data.code === 200 || res.data.code === 1) {
                setLogs(res.data.data.list);
                setTotal(res.data.data.total);
            } else {
                dispatch(showMessage({ type: "error", content: res.data.msg || "获取日志失败" }));
            }
        } catch (error: any) {
            dispatch(showMessage({ type: "error", content: error.message || "获取日志失败" }));
        } finally {
            setLoading(false);
        }
    }, [searchParamsState, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = (keyword: string) => {
        const newState = { ...searchParamsState, keyword, page: 1 };
        setSearchParamsState(newState);
        updateUrlParams(newState);
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const level = e.target.value as 'INFO' | 'WARNING' | 'ERROR' | undefined;
        const newState = { ...searchParamsState, level: level || undefined, page: 1 };
        setSearchParamsState(newState);
        updateUrlParams(newState);
    };

    const handlePageChange = (page: number) => {
        const newState = { ...searchParamsState, page };
        setSearchParamsState(newState);
        updateUrlParams(newState);
    };

    const renderLevel = (level: string) => {
        switch (level) {
            case 'INFO': return <Chip color="primary" size="sm" variant="flat">INFO</Chip>;
            case 'WARNING': return <Chip color="warning" size="sm" variant="flat">WARN</Chip>;
            case 'ERROR': return <Chip color="danger" size="sm" variant="flat">ERROR</Chip>;
            default: return <Chip size="sm" variant="flat">{level}</Chip>;
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
                <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
                    <Select 
                        label="日志级别" 
                        size="sm" 
                        className="w-full sm:w-32" 
                        onChange={handleLevelChange}
                        defaultSelectedKeys={[""]}
                    >
                        {levels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                                {level.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        label="关键词"
                        size="sm"
                        placeholder="搜索日志内容"
                        className="w-full sm:w-64"
                        onValueChange={handleSearch}
                        isClearable
                    />
                </div>
            </div>

            <Table 
                aria-label="Polling Logs"
                bottomContent={
                    total > 0 ? (
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={searchParamsState.page}
                                total={Math.ceil(total / (searchParamsState.page_size || 20))}
                                onChange={handlePageChange}
                            />
                        </div>
                    ) : null
                }
            >
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>级别</TableColumn>
                    <TableColumn>模块</TableColumn>
                    <TableColumn>消息</TableColumn>
                    <TableColumn>时间</TableColumn>
                </TableHeader>
                <TableBody 
                    items={logs} 
                    loadingContent={<Spinner />} 
                    isLoading={loading}
                    emptyContent={"暂无日志数据"}
                >
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{renderLevel(item.level)}</TableCell>
                            <TableCell>{item.module}</TableCell>
                            <TableCell>
                                <div className="whitespace-pre-wrap max-w-xs sm:max-w-md lg:max-w-xl overflow-hidden text-ellipsis">
                                    {item.message}
                                </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{item.created_at}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
