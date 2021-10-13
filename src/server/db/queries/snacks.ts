import { Query } from "..";
import { Snacks } from "../../../../types";

export const get_snacks = () => Query<Snacks[]>
    ('SELECT * FROM Orders');
export const get_one_snack = (id: number) => Query<Snacks[]>
    ('SELECT * FROM Orders WHERE id=?', [id]);