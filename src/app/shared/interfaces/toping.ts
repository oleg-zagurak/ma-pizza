export interface ITopingReq {
    name: string,
    imagePath: string,
    weight: string,
    price: number,
    count: number
}

export interface IToping extends ITopingReq{
    id: string
}