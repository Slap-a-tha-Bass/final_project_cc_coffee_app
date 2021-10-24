import { Request } from "express";

export interface mysqlResponse {
    affectedRows: number,
    insertId: number,
    sqlMessage: string
}
export interface Orders {
    id?: string,
    first_name?: string,
    price?: number,
    _created?: Date,
    _updated?: Date,
    isPreview?: boolean,
    in_progress?: boolean,
    is_finished?: boolean
}
export interface Drinks {
    id?: number,
    name?: string,
    price?: number
}
export interface DrinksOrder {
    id?: number,
    drink_id?: number,
    price?: number,
    order_id?: string
}
export interface Snacks {
    id?: number,
    name?: string,
    price?: number
}
export interface SnacksOrder {
    id?: number,
    drink_id?: number,
    price?: number,
    order_id?: string
}
export interface Users {
    id?: string,
    full_name?: string,
    email?: string,
    password?: string,
    _created?: Date
}
export interface ReqUsers extends Request {
    user?: Users
}
export interface PaymentProps {
    id: string,
    fullName: string,
    amount: number,
    tip: number,
    subtotal: number
}