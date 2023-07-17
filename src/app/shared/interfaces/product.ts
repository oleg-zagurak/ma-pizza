import { Subcategories } from "../constants/subcategories";
import { IToping } from "./toping";

export interface IProductReq {
    category: string,
    subcategory: Subcategories[] | null,
    imagePath: string,
    name: string,
    ingredients: string,
    price: number,
    weight: string,
    bonus: number,
    count: number,
    recomendation: IToping[],
    topings?: IToping[]
}

export interface IProduct extends IProductReq{
    id: string
}