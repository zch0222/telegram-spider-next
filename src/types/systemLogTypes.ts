export interface PollingLogSearchDTO {
    level?: 'INFO' | 'ERROR' | 'WARNING';
    keyword?: string;
    page?: number;
    page_size?: number;
}

export interface PollingLogItem {
    id: number;
    level: 'INFO' | 'ERROR' | 'WARNING';
    message: string;
    module: string;
    created_at: string;
}

export interface PollingLogListRes {
    list: PollingLogItem[];
    total: number;
    page: number;
    page_size: number;
}
