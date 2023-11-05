import request, { Method, myService } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import { Message } from "@/types/messageSpiderTypes";
import {GenericAbortSignal} from "axios";


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
    return request<ResData<Message[]>>({
        url: "/search_message_text",
        needToken: false,
        method: Method.POST,
        data: params
    })
}

export function submitMessageMediaDownload(params: {
    message_link: string
}) {
    return request<ResData<string>>({
        url: "/download_message_media",
        needToken: false,
        method: Method.POST,
        data: params
    })
}

export function getMessageMediaDownloadProcess(params: {
    onDownloadProcess: any,
    signal: GenericAbortSignal
}) {
    return myService().get('/message_media_download_process', {
        onDownloadProgress: params.onDownloadProcess,
        signal: params.signal
    })
}

export function getMessageSpiderProcess(params: {
    onDownloadProcess: any,
    signal: GenericAbortSignal
}) {
    return myService().get('/task_process', {
        onDownloadProgress: params.onDownloadProcess,
        signal: params.signal
    })
}

export function restart() {
    return request<ResData<string>>({
        url: "/restart",
        method: Method.POST,
        needToken: false
    })
}

export function getServerStatus(params: {
    onDownloadProcess: any,
    signal: GenericAbortSignal
}) {
    return myService().get("/status", {
        onDownloadProgress: params.onDownloadProcess,
        signal: params.signal
    })
}
