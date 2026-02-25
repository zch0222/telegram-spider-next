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
    // If we are using the proxy (e.g. locally), we should use /api prefix
    // But EventSource needs a full URL or relative path. 
    // Since we set up a rewrite for /api -> NEXT_PUBLIC_BASE_URL
    // We should use /api/yt-dlp/process locally to go through the proxy and get cookies.
    if (typeof window !== 'undefined') {
        return '/api/yt-dlp/process';
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/yt-dlp/process`;
}
