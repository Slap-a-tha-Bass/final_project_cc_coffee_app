import { Query } from "..";
import { DrinksOrder } from "../../../../types";

export const get_drinksorder = () => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder JOIN Orders ON DrinksOrder.order_id = Orders.id');
export const get_one_drinksorder = (id: number) => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder WHERE id=?', [id]);
export const post_drinksorder = (newDrinksOrder: DrinksOrder) => Query
    ('INSERT INTO DrinksOrder SET ?', [newDrinksOrder]);