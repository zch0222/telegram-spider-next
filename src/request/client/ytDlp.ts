import request, { Method } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import { YtDlpSubmitDTO, YtDlpSubmitRes } from "@/types/youtubeDLType";

export function submitYtDlp(params: YtDlpSubmitDTO) {
    return request<ResData<YtDlpSubmitRes>>({
        url: '/yt-dlp/submit',
        needToken: true,
        method: Method.POST,
        data: params
    })
}

export const getYtDlpProcessUrl = () => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/yt-dlp/process`;
}

