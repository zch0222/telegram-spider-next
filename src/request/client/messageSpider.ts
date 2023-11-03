import request, { Method } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import { Message } from "@/types/messageSpiderTypes";


export function submitMessageSpiderTask(params: {
    channel: string,
    min_id: number
}) {
    return request<ResData<string>>({
        url: '/submit',
        needToken: false,
        method: Method.POST,
        data: params
    })
}

export function searchMessageText(params: {
    messageText: string
}) {
    console.log(222222)
    return request<ResData<Message[]>>({
        url: "/search_message_text",
        needToken: false,
        method: Method.POST,
        data: params
    })
}
