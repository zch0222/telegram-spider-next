import {all, AxiosResponse, GenericAbortSignal} from "axios";
import store from "@/store";
import { logoutSuccess } from "@/store/auth/authSlice";

import {service, MyAxiosRequestConfig, Method, getTokenDebounce} from "./request";

service.interceptors.request.use(
    // async (config: MyAxiosRequestConfig) => {
    //     console.log(store.getState().user)
    //     const accessToken: string | undefined = store.getState().user.token?.accessToken;
    //     if (config.needToken && accessToken) {
    //         config.headers['accessToken'] = accessToken;
    //     }
    //     return config;
    // },
    // error => {
    //     Promise.reject(error);
    // }
);

// export const refreshToken = getTokenDebounce() as unknown as () => Promise<any>;
// var isRefreshToken = 0;
// var isRefreshing = false;
// let requests: Function[] = [];

service.interceptors.response.use(
    response => {
        if (response.data.code !== 1 && response.data.code !== 200) {
            // alert(response.data.msg);
            // message.error(response.data.msg)
            return Promise.reject(response.data.msg)
        }
        return response
    },
    async error => {
        console.log("re111111");
        const errorResponse = error.response || {};
        const errorData = errorResponse.data || {};
        console.log(errorResponse.status);
        if (errorResponse.status === 401) {
            store.dispatch(logoutSuccess());
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
            return Promise.reject("请先登录")
        } else if (errorResponse.status !== 401) {
            console.log(1212121)
            // alert("服务器异常请稍后再试试");
            // PubSub.publish("MODAL NOTICE", {
            //     type: 'error',
            //     config: {
            //         title: "请求失败",
            //         content: "网络异常"
            //     }
            // });
        }
        return Promise.reject(error);
    }
)

export { Method, service }

export default function clientRequest<T>(options: {
    url: string,
    method: string,
    needToken: boolean,
    data?: any,
    params?: any,
}, config?: {
    onDownloadProgress?: any,
    signal?: GenericAbortSignal
}): Promise<AxiosResponse<T>> {
    return service(options);
}


export function myService() {
    return service;
}
