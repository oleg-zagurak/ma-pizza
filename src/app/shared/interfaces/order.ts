import { IProduct } from "./product"

export interface IOrderReq{
    products: IProduct[],
    name: string,
    tel: string,
    email: string,
    deliveryType: string,
    address: string,
    deliveryTime: string,
    payment: string,
    rest: string,
    recall: boolean,
    comment: string,
    status: boolean,
    number: number,
    userId: string
}
export interface IOrder extends IOrderReq{
    id: string
}
