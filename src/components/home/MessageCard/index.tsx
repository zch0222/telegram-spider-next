import { Card, CardBody, Link, CardFooter, CardHeader } from "@nextui-org/react";
import { Message } from "@/types/messageSpiderTypes";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default function MessageCard({data}: {
    data: Message
}) {

    const { channel, date, message_text, create_time, update_time, link, channel_name, sender_username } = data;

    return (
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start px-4 pt-4 pb-2">
                <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold leading-none">{channel_name}</div>
                    <div className="text-small text-default-500">{channel}</div>
                </div>
                {sender_username && (
                    <div className="text-tiny text-default-500 bg-default-100 px-2 py-1 rounded-full">
                        @{sender_username}
                    </div>
                )}
            </CardHeader>
            <CardBody className="px-4 py-2">
                <div className="text-medium text-default-700 font-normal break-words">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        components={{
                            a: ({node, ...props}) => <a {...props} className="text-primary hover:underline cursor-pointer" target="_blank" rel="noopener noreferrer" />,
                            p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                            ul: ({node, ...props}) => <ul {...props} className="list-disc pl-5 mb-2" />,
                            ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-5 mb-2" />,
                            h1: ({node, ...props}) => <h1 {...props} className="text-2xl font-bold mb-2" />,
                            h2: ({node, ...props}) => <h2 {...props} className="text-xl font-bold mb-2" />,
                            h3: ({node, ...props}) => <h3 {...props} className="text-lg font-bold mb-2" />,
                            blockquote: ({node, ...props}) => <blockquote {...props} className="border-l-4 border-default-300 pl-4 italic my-2" />,
                            code: ({node, ...props}) => <code {...props} className="bg-default-100 rounded px-1 py-0.5 text-sm font-mono" />,
                            pre: ({node, ...props}) => <pre {...props} className="bg-default-100 rounded p-2 overflow-x-auto text-sm font-mono my-2" />,
                        }}
                    >
                        {message_text}
                    </ReactMarkdown>
                </div>
            </CardBody>
            <CardFooter className="px-4 pb-4 pt-2">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="text-tiny text-default-400">
                        {new Date(date.endsWith("Z") ? date : date + "Z").toLocaleString()}
                    </div>
                    <Link isExternal href={link} size="sm" showAnchorIcon color="primary">
                        查看原文
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
