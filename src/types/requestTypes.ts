export interface ResData<T> {
    code: number
    msg: string | null
    data: T
}

export interface PageBean<T> {
    rows: T[]
    total: number
    pages: number
    current: number
}
