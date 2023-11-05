'use client'

import {useState} from "react";
import {Card, CardBody, Input, Button, Tabs, Tab} from "@nextui-org/react";
import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider";
import FloatButton from "@/components/home/FloatButton";

import SubmitTaskTab from "../components/home/SubmitTaskTab";
import MessageSearchTab from "@/components/home/MessageSearchTab";
import TaskProcessTab from "@/components/home/TaskProcessTab";
import SettingModal from "@/components/SettingModal";

function Home() {
    const [selected, setSelected] = useState<any>("submit_task");

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
          <Card className="max-w-full w-[80%] min-h-[385px] max-h-[80%] box-border max-w-[800px] min-w-[250px]">
              <CardBody>
                  <div className="flex justify-center items-center text-3xl font-bold mb-5">
                      Telegram Spider
                  </div>
                  <div className="min-h-[365px]">
                      <Tabs
                          fullWidth
                          size="md"
                          selectedKey={selected}
                          onSelectionChange={(value) => setSelected(value)}
                      >
                          <Tab key="submit_task" title="提交任务">
                              <SubmitTaskTab/>
                          </Tab>
                          <Tab key="task_list" title="任务列表">
                              <TaskProcessTab/>
                          </Tab>

                          <Tab className="w-ful" key="search" title="搜索消息">
                              <MessageSearchTab/>
                          </Tab>
                      </Tabs>
                  </div>

              </CardBody>
          </Card>
        <FloatButton/>
        <SettingModal/>
      </div>
  )
}

export default withAntdConfigProvider(Home)
