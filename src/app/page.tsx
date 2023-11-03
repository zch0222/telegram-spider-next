'use client'

import {useState} from "react";
import {Card, CardBody, Input, Button, Tabs, Tab} from "@nextui-org/react";

import SubmitTaskForm from "@/components/home/SubmitTaskForm";
import MessageSearchTab from "@/components/home/MessageSearchTab";

export default function Home() {
    const [selected, setSelected] = useState<any>("submit_task");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
          <Card className="max-w-full w-[80%] h-[400px] max-w-[800px] min-w-[250px]">
              <CardBody>
                  <div className="flex justify-center items-center text-3xl font-bold mb-5">
                      Telegram Spider
                  </div>
                  <Tabs
                      fullWidth
                      size="md"
                      selectedKey={selected}
                      onSelectionChange={(value) => setSelected(value)}
                  >
                      <Tab key="submit_task" title="提交任务">
                          <SubmitTaskForm/>
                      </Tab>
                      <Tab key="task_list" title="任务列表">

                      </Tab>

                      <Tab className="w-full" key="search" title="搜索消息">
                          <MessageSearchTab/>
                      </Tab>

                  </Tabs>

              </CardBody>
          </Card>
      </div>
  )
}
