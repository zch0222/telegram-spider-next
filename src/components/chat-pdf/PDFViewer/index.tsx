'use client'
import { useState, useRef } from "react";
// @ts-ignore
import { usePdf } from '@mikecousins/react-pdf';
import { Card, Button, Image, CardHeader, CardBody } from "@nextui-org/react";

import Chat from "@/components/chat-pdf/Chat";
import Loading from "@/components/Loading";
import Close from "@/components/svg/Close";


export default function PDFViewer({ src }: {
    src: string
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [page, setPage] = useState(1)
    const [isShowChat, setIsShowChat] = useState<boolean>(false)

    const { pdfDocument, pdfPage } = usePdf({
        file: src,
        page,
        canvasRef,
    });

    const previous = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const next = () => {
        if (page < pdfDocument?.numPages) {
            setPage(page + 1)
        }
    }

    if (!pdfDocument) {
        return (
            <Loading/>
        )
    }


    return (
        <div className="w-full h-full">
            {
                isShowChat ?
                    <Card className="absolute max-w-[500px] max-h-[500px] w-[80%] h-[80%] right-2 top-[70px]">
                        <CardHeader className="flex flex-row justify-end">
                            <div
                                className="w-[35px] h-[35px] cursor-pointer"
                                onClick={() => setIsShowChat(false)}
                            >
                                <Close
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Chat
                                pdfUrl={src}
                            />
                        </CardBody>
                    </Card>
                :
                <></>
            }
            <div className="flex flex-col items-center w-full h-full">
                <Card
                    className="flex flex-row items-center justify-center w-full p-1 pl-2 pr-2 h-[60px] min-h-[60px]"
                    radius="none"
                >
                    <Button size="sm" onClick={previous}>Previous</Button>
                    <div className="flex justify-center items-center w-[80px]">
                        {`${page}/${pdfDocument?.numPages}`}
                    </div>
                    <Button size="sm" onClick={next}>
                        Next
                    </Button>
                    <div className="flex-grow flex flex-row justify-end">
                        <Card isPressable className="rounded-[50px]" onClick={() => {
                            setIsShowChat(!isShowChat)
                        }}>
                            <Image
                                className="object-cover rounded-[50px] w-[50px] h-[50px]"
                                src="https://anynote.obs.cn-east-3.myhuaweicloud.com/images/gpt_button.jpg"
                                alt="chat"
                            />
                        </Card>
                    </div>
                </Card>
                <canvas className="max-w-full" ref={canvasRef}/>
            </div>
        </div>
    )
}

