import request, { Method } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import { YtDlpSubmitDTO, YtDlpSubmitRes, YtDlpTask } from "@/types/youtubeDLType";

export function submitYtDlp(params: YtDlpSubmitDTO) {
    return request<ResData<YtDlpSubmitRes>>({
        url: '/yt-dlp/submit',
        needToken: true,
        method: Method.POST,
        data: params
    })
}

export function getYtDlpList() {
    return request<ResData<YtDlpTask[]>>({
        url: '/yt-dlp/list',
        needToken: true,
        method: Method.GET
    })
}

export const getYtDlpProcessUrl = () => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/yt-dlp/process`;
}
