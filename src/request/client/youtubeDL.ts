import request, { Method, myService } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import {GenericAbortSignal} from "axios";
import { YoutubeDLSubmitDTO } from "@/types/youtubeDLType";

export function submitYoutubeDL(params: YoutubeDLSubmitDTO) {
    return request<ResData<string>>({
        url: '/youtube_dl/submit',
        needToken: false,
        method: Method.POST,
        data: params
    })
}

export function getYoutubeDLDownloadProcess(params: {
    signal: GenericAbortSignal,
    onDownloadProcess: any
}) {
    return myService().get("/youtube_dl/process", {
        signal: params.signal,
        onDownloadProgress: params.onDownloadProcess
    })
}

