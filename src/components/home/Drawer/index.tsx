'use client'
import { Drawer as AntdDrawer } from "antd";
import withAntdConfigProvider from "@/components/hoc/withAntdConfigProvider"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setDrawer } from "@/store/drawer/drawerSlice";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image"

function Drawer() {

    const drawer = useSelector((state: RootState) => state.drawer)
    const { isOpen } = drawer
    const dispatch = useDispatch()

    // useEffect(() => {
    //
    // }, )

    return (
        <AntdDrawer
          classNames={{
              content: "max-width: 50px"
          }}
          open={isOpen}
          onClose={() => {
              dispatch(setDrawer({
                  ...drawer,
                  isOpen: false
              }))
          }}
          placement="left"
          closeIcon={null}
        >
            <div className="flex flex-row justify-between flex-wrap items-center p-2">
                <Card className="flex justify-center items-center text-base font-bold w-[150px] h-[60px] m-2" isPressable>
                    {/*<div className="absolute z-10">*/}
                    {/*    Telegram Spider*/}
                    {/*</div>*/}
                    <Image
                        priority={true}
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="/telegram.jpg"
                        width={150}
                        height={60}
                    />
                </Card>

                <Card className="flex justify-center items-center text-base font-bold w-[150px] h-[60px] m-2" isPressable>
                    Telegram Spider
                </Card>

                <Card className="flex justify-center items-center text-base font-bold w-[150px] h-[60px] m-2" isPressable>
                    Telegram Spider
                </Card>
            </div>
        </AntdDrawer>
    )
}

export default withAntdConfigProvider(Drawer)
