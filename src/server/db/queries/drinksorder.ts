import { Query } from "..";
import { DrinksOrder } from "../../../../types";

export const get_drinksorder = () => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder');
export const get_one_drinksorder = (id: number) => Query<DrinksOrder[]>
    ('SELECT * FROM DrinksOrder WHERE id=?', [id]);
export const post_drinksorder = (newDrinksOrder: DrinksOrder, order_id: string) => Query
    ('INSERT INTO DrinksOrder SET ?', [newDrinksOrder, order_id]);