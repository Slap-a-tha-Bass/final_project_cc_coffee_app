import { Query } from "..";
import { Orders } from "../../../../types";

export const get_orders = () => Query<Orders[]>
    ('SELECT * FROM Orders ORDER BY _created DESC');
export const get_one_order = (id: string) => Query<Orders[]>
    ('SELECT * FROM Orders WHERE id=?', [id]);
export const post_order = (newOrder: Orders) => Query
    ('INSERT INTO Orders SET ?', [newOrder]);
export const edit_order = (editOrder: Orders, id: string) => Query
    ('UPDATE Orders SET ? WHERE id=?', [editOrder, id]);
export const delete_order = (id: string) => Query
    ('DELETE FROM Orders WHERE id=?', [id]);

export const get_JOIN_quantities = (drink_id: number, snack_id: number) => Query<Orders[]>
    (`SELECT o.id, do.dr_quantity, so.sn_quantity, do.drink_id, so.snack_id FROM Orders o 
    JOIN DrinksOrder do ON o.id=do.order_id
    JOIN SnacksOrder so ON o.id=so.order_id WHERE drink_id=? AND snack_id=? `, [drink_id, snack_id]);

export const get_JOIN_everything_by_ID = (id: string) => Query<Orders[]>
    (`SELECT o.id, 
        GROUP_CONCAT(distinct d.name ORDER BY d.id  separator '&') as drink_names, 
        GROUP_CONCAT(distinct s.name ORDER BY s.id separator '&') as snack_names,
        GROUP_CONCAT(distinct d.price ORDER BY d.id separator '&') as drink_prices, 
        GROUP_CONCAT(distinct s.price ORDER BY s.id separator '&') as snack_prices,
        GROUP_CONCAT(distinct s.id separator '&') as snack_id,
        GROUP_CONCAT(distinct d.id separator '&') as drink_id
    FROM Orders o
        JOIN SnacksOrder so ON o.id=so.order_id 
        JOIN DrinksOrder do ON o.id=do.order_id 
        JOIN Snacks s ON so.snack_id=s.id 
        JOIN Drinks d ON do.drink_id=d.id WHERE o.id=? GROUP BY o.id`, [id]);

