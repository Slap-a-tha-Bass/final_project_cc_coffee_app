import { Query } from "..";
import { Drinks } from "../../../../types";

export const get_drinks = () => Query<Drinks[]>
    ('SELECT * FROM Drinks');
export const get_one_drink = (id: number) => Query<Drinks[]>
    ('SELECT * FROM Drinks WHERE id=?', [id]);