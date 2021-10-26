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

export const get_JOIN_everything = (id: string) => Query<Orders[]>
    (`SELECT o.id, 
    GROUP_CONCAT(distinct d.name separator '&') as drink_names, 
    GROUP_CONCAT(distinct s.name separator '&') as snack_names FROM Orders o 
    JOIN SnacksOrder so ON o.id=so.order_id 
    JOIN DrinksOrder do ON o.id=do.order_id 
    JOIN Snacks s ON so.snack_id=s.id 
    JOIN Drinks d ON do.drink_id=d.id WHERE id=? GROUP BY o.id`);