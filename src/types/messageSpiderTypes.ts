
export interface Message {
    id?: number;
    channel: string;
    channel_name: string;
    sender_id: string;
    sender_username: string | null;
    message_id: number;
    date: string;
    message_text: string;
    link: string;
    create_time?: string;
    update_time?: string;
}

export interface MessageListResponse {
    list: Message[];
    total: number;
    page: number;
    page_size: number;
}

export interface SearchMessageParams {
    messageText?: string;
    channel?: string;
    page?: number;
    page_size?: number;
}


export interface MessageSpiderProcess {
    name: string
    createTime: string;
    channel: string;
    currentMessageId: number;
    minMessageId: number;
    percent: number
}


