
export interface Message {
    id: number;
    channel: string;
    channel_name: string;
    sender_id: string;
    sender_username: string;
    message_id: number;
    date: string;
    message_text: string;
    link: string;
    create_time: string;
    update_time: string;
}


export interface MessageSpiderProcess {
    name: string
    createTime: string;
    channel: string;
    currentMessageId: number;
    minMessageId: number;
    percent: number
}

