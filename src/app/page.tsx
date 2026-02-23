'use client'
import {Tabs, Tab, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import withThemeConfigProvider from "../components/hoc/withThemeConfigProvider";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

import SubmitTaskTab from "../components/home/SubmitTaskTab";
import MessageSearchTab from "@/components/home/MessageSearchTab";
import TaskProcessTab from "@/components/home/TaskProcessTab";
import SystemLogTab from "@/components/home/SystemLogTab";

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<string>("submit_task");

  useEffect(() => {
    if (searchParams) {
      const tab = searchParams.get('tab');
      if (tab) {
        setSelectedTab(tab);
      }
    }
  }, [searchParams]);

  const handleTabChange = (key: React.Key) => {
    setSelectedTab(key as string);
    // Create a new URLSearchParams object from the current searchParams
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.set('tab', key as string);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleMenuAction = (key: string | number) => {
    if (key === 'logout') {
      router.push('/logout');
    } else if (key === 'change_password') {
      router.push('/change-password');
    }
  };

  return (
      <div className="flex flex-col w-full h-full p-4">
          <div className="flex justify-between items-center mb-5">
              <div className="text-3xl font-bold">
                  Telegram Spider
              </div>
              <Dropdown>
                  <DropdownTrigger>
                      <Button variant="bordered">用户设置</Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" onAction={handleMenuAction}>
                      <DropdownItem key="change_password">修改密码</DropdownItem>
                      <DropdownItem key="logout" className="text-red-700 font-medium">退出登录</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
          </div>
          <div className="w-full flex-grow">
              <Tabs
                  fullWidth
                  size="md"
                  aria-label="Options"
                  selectedKey={selectedTab}
                  onSelectionChange={handleTabChange}
              >
                  <Tab key="submit_task" title="提交任务">
                      <SubmitTaskTab/>
                  </Tab>
                  <Tab key="task_list" title="任务列表">
                      <TaskProcessTab/>
                  </Tab>

                  <Tab key="search" title="搜索消息">
                      <MessageSearchTab/>
                  </Tab>
                  <Tab key="system_log" title="系统日志">
                      <SystemLogTab/>
                  </Tab>
              </Tabs>
          </div>
      </div>
  )
}

export default withThemeConfigProvider(Home)
