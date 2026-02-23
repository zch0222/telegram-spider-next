import request, { Method } from "@/utils/client-request"
import { ResData } from "@/types/requestTypes";
import { PollingLogSearchDTO, PollingLogListRes } from "@/types/systemLogTypes";

export function searchPollingLog(params: PollingLogSearchDTO) {
    return request<ResData<PollingLogListRes>>({
        url: '/polling_log/search',
        needToken: true,
        method: Method.POST,
        data: params
    })
}
