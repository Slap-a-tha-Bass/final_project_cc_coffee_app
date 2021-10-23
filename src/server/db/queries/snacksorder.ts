import { Query } from "..";
import { SnacksOrder } from "../../../../types";

export const get_snacksOrder = () => Query<SnacksOrder[]>
    ('SELECT * FROM SnacksOrder');
export const get_one_snacksOrder = (id: number) => Query<SnacksOrder[]>
    ('SELECT * FROM SnacksOrder WHERE id=?', [id]);
export const post_snacksOrder = (newSnacksOrder: SnacksOrder, order_id: string) => Query
    ('INSERT INTO SnacksOrder SET ?', [newSnacksOrder, order_id]);