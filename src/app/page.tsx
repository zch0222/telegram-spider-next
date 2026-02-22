'use client'
import {Tabs, Tab} from "@nextui-org/react";
import withThemeConfigProvider from "../components/hoc/withThemeConfigProvider";

import SubmitTaskTab from "../components/home/SubmitTaskTab";
import MessageSearchTab from "@/components/home/MessageSearchTab";
import TaskProcessTab from "@/components/home/TaskProcessTab";

function Home() {

  return (
      <div className="flex flex-col w-full h-full p-4">
          <div className="flex justify-center items-center text-3xl font-bold mb-5">
              Telegram Spider
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
