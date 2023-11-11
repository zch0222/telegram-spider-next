'use client'
import { Drawer as AntdDrawer } from "antd";
import withThemeConfigProvider from "../../hoc/withThemeConfigProvider"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setDrawer } from "@/store/drawer/drawerSlice";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image"
import { useRouter } from "next/navigation";

function Drawer() {

    const drawer = useSelector((state: RootState) => state.drawer)
    const { isOpen } = drawer
    const dispatch = useDispatch()
    const router = useRouter()

    const items: {
        id: number,
        image: string | null,
        text: string | null,
        onClick: () => void
    }[] = [
        {
            id: 1,
            image: "/telegram.jpg",
            text: null,
            onClick: () => {
                router.push("/")
                dispatch(setDrawer({
                    isOpen: false
                }))
            }
        },
        {
            id: 2,
            image: "/images/gpt_button.jpg",
            text: "GTP",
            onClick: () => {
                router.push("/gpt")
                dispatch(setDrawer({
                    isOpen: false
                }))
            }
        },
        {
            id: 3,
            image: null,
            text: "Test",
            onClick: () => {
                dispatch(setDrawer({
                    isOpen: false
                }))
            }
        }
    ]

    // useEffect(() => {
    //
    // }, )

    return (
        <AntdDrawer
          contentWrapperStyle={{
              width: "55%",
              maxWidth: 400
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
                {items.map(item => (
                    <Card
                        key={item.id}
                        className="flex justify-center items-center text-xl font-bold w-[45%] h-[60px] m-2 max-w-[150px] min-w-[120px]"
                        isPressable
                        onClick={item.onClick}
                    >
                        <div className="absolute z-10">
                            {item.text}
                        </div>
                        {item.image ?
                            <Image
                                priority={true}
                                alt="Card background"
                                className="z-0 w-full h-full object-cover"
                                src={item.image}
                                width={150}
                                height={60}
                            /> : <></>}
                    </Card>
                ))}


                {/*<Card className="flex justify-center items-center text-base font-bold w-[150px] h-[60px] m-2" isPressable>*/}
                {/*    Telegram Spider*/}
                {/*</Card>*/}

                {/*<Card className="flex justify-center items-center text-base font-bold w-[150px] h-[60px] m-2" isPressable>*/}
                {/*    Telegram Spider*/}
                {/*</Card>*/}
            </div>
        </AntdDrawer>
    )
}

export default withThemeConfigProvider(Drawer)
