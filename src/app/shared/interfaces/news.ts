export interface INewsReq {
    title: string,
    titleImage: string,
    content: string
}

export interface INews extends INewsReq {
    id: string
}
