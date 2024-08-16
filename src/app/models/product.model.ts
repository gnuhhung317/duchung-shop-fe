import { Category } from "./category.model";

export interface Product{
    id: number;
    name: string;
    price:number;
    thumbnail:string;
    description:string
    category:Category
}