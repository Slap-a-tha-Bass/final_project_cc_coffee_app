import { Query } from "..";
import { DrinksOrder } from "../../../../types";

export const get_drinksorder = () => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder JOIN Orders ON DrinksOrder.order_id = Orders.id');
export const get_one_drinksorder = (order_id: string) => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder WHERE order_id=?', [order_id]);
export const post_drinksorder = (newDrinksOrder: DrinksOrder) => Query
    ('INSERT INTO DrinksOrder SET ?', [newDrinksOrder]);