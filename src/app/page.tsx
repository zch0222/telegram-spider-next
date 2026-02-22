'use client'
import {Tabs, Tab, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import withThemeConfigProvider from "../components/hoc/withThemeConfigProvider";
import { useRouter } from 'next/navigation';

import SubmitTaskTab from "../components/home/SubmitTaskTab";
import MessageSearchTab from "@/components/home/MessageSearchTab";
import TaskProcessTab from "@/components/home/TaskProcessTab";

function Home() {
  const router = useRouter();

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

              </Tabs>
          </div>
      </div>
  )
}

export default withThemeConfigProvider(Home)
