export interface YoutubeDLSubmitDTO {
    url_list: string[]
}

export interface YoutubeDLDownloadProcess {
    id: string,
    url_list: string[]
}

export interface YtDlpSubmitDTO {
    url: string
}

export interface YtDlpSubmitRes {
    task_id: number
}

export interface YtDlpProcess {
    id: number;
    url: string;
    status: 'pending' | 'downloading' | 'completed' | 'failed';
    title?: string;
    progress?: number;
    speed?: string;
    eta?: string;
    error?: string;
}
