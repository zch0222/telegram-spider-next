import clientRequest from "@/utils/client-request";
import { ResData } from "@/types/requestTypes";

export const login = (data: any) => {
    return clientRequest<ResData<null>>({
        url: '/auth/login',
        method: 'POST',
        needToken: false,
        data
    });
}

export const logout = () => {
    return clientRequest<ResData<null>>({
        url: '/auth/logout',
        method: 'POST',
        needToken: false
    });
}

export const changePassword = (data: any) => {
    return clientRequest<ResData<null>>({
        url: '/auth/change_password',
        method: 'POST',
        needToken: true,
        data
    });
}
