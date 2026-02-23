'use client'
import { Input, Button, Pagination } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { searchMessageText } from "@/request/client/messageSpider";
import MessageCard from "@/components/home/MessageCard"
import { Message } from "@/types/messageSpiderTypes";
import {nanoid} from "nanoid";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function MessageSearchTab() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")
    const [channel, setChannel] = useState<string>("")
    const [messageData, setMessageData] = useState<Message[]>([])
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const pageSize = 20

    useEffect(() => {
        if (searchParams) {
            const searchTextParam = searchParams.get('searchText');
            const channelParam = searchParams.get('channel');
            const pageParam = searchParams.get('page');

            if (searchTextParam) setSearchText(searchTextParam);
            if (channelParam) setChannel(channelParam);
            
            let initialPage = 1;
            if (pageParam) {
                const pageNum = Number(pageParam);
                if (!isNaN(pageNum) && pageNum > 0) {
                    setPage(pageNum);
                    initialPage = pageNum;
                }
            }

            // 初始化时如果参数存在，执行搜索
            if (searchTextParam || channelParam || pageParam) {
                 doSearch(
                     searchTextParam || "",
                     channelParam || "",
                     initialPage
                 );
            } else {
                // 如果没有参数，也执行一次默认搜索（获取全部或推荐内容）
                doSearch("", "", 1);
            }
        } else {
             // 如果 searchParams 为 null (不太可能，但在某些环境中可能发生)，也执行默认搜索
             doSearch("", "", 1);
        }

        // 组件卸载时清理参数
        return () => {
            const params = new URLSearchParams(window.location.search);
            // 只有当参数存在时才进行清理操作，避免不必要的跳转
            if (params.has('searchText') || params.has('channel') || params.has('page')) {
                params.delete('searchText');
                params.delete('channel');
                params.delete('page');
                // 使用 window.history.replaceState 不触发重新渲染，仅修改 URL
                window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
            }
        };
    }, []);

    // 更新 URL 参数
    const updateUrlParams = (newSearchText: string, newChannel: string, newPage: number) => {
        // 使用 window.location.search 获取最新的 URL 参数
        const params = new URLSearchParams(window.location.search);
        
        if (newSearchText) params.set('searchText', newSearchText);
        else params.delete('searchText');
        
        if (newChannel) params.set('channel', newChannel);
        else params.delete('channel');
        
        if (newPage > 1) params.set('page', newPage.toString());
        else params.delete('page'); // 第一页通常不需要显示 page 参数

        router.replace(`${pathname}?${params.toString()}`);
    }

    const doSearch = (text: string, ch: string, pageNo: number) => {
        setIsSearching(true)
        searchMessageText({
            messageText: text || undefined,
            channel: ch || undefined,
            page: pageNo,
            page_size: pageSize
        }).then(res => {
            console.log(res)
            if (res.data.code === 200 || res.data.code === 1) {
                setMessageData(res.data.data?.list || [])
                setTotal(res.data.data?.total || 0)
            }
        }).finally(
            () => {
                setIsSearching(false)
            }
        )
    }

    const search = (pageNo: number = 1) => {
        setPage(pageNo);
        updateUrlParams(searchText, channel, pageNo);
        doSearch(searchText, channel, pageNo);
    }


    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className="flex flex-col justify-center items-center w-[95%] gap-4 mt-4">
                <Input
                    className="w-full"
                    label="搜索文字"
                    placeholder="输入搜索文字"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value)
                    }}
                />
                <Input
                    className="w-full"
                    label="频道"
                    placeholder="输入频道用户名 (例如 @google)"
                    value={channel}
                    onChange={(e) => {
                        setChannel(e.target.value)
                    }}
                />
                <Button className="w-full" onClick={() => search(1)} isLoading={isSearching} color="primary">搜索</Button>
            </div>

            <div className="w-full flex flex-col justify-center items-center flex-grow overflow-y-auto">
                {messageData.map(item => (
                    <div className="mt-3 w-[95%]" key={nanoid()}>
                        <MessageCard data={item}/>
                    </div>
                ))}
            </div>
            
            {total > 0 && (
                <div className="flex justify-center w-full py-4">
                    <Pagination 
                        total={Math.ceil(total / pageSize)} 
                        page={page} 
                        onChange={(page) => search(page)}
                        showControls
                    />
                </div>
            )}
        </div>
    )
}
