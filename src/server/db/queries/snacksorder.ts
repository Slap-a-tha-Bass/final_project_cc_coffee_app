import { Query } from "..";
import { SnacksOrder } from "../../../../types";

export const get_snacksorder = () => Query<SnacksOrder[]>
    ('SELECT * FROM SnacksOrder');
export const get_one_snacksorder = (order_id: string) => Query<SnacksOrder[]>
    ('SELECT * FROM SnacksOrder WHERE id=?', [order_id]);
export const post_snacksorder = (newSnacksOrder: SnacksOrder) => Query
    ('INSERT INTO SnacksOrder SET ?', [newSnacksOrder]);