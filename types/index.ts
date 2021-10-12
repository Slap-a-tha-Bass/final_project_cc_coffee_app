import { Request } from "express";

export interface mysqlResponse {
    affectedRows: number,
    insertId: number,
    sqlMessage: string
}
export interface Orders {
    id?: string,
    first_name?: string,
    drink_id?: number,
    snack_id?: number,
    price?: number,
    _created?: Date,
    _updated?: Date,
    isPreview?: boolean,
    in_progess?: boolean,
    is_finished?: boolean
}
export interface Drinks {
    id: number,
    name: string,
    price: number
}
export interface Snacks {
    id: number,
    name: string,
    price: number
}
export interface Users {
    id?: number,
    full_name?: string,
    email?: string,
    password?: string,
    _created?: Date
}
export interface ReqUsers extends Request {
    user?: Users
}