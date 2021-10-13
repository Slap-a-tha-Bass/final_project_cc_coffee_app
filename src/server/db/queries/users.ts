import { Query } from "..";
import { Users } from "../../../../types";

export const find_user = (column: string, value: string) => Query<Users[]>
    ('SELECT * FROM Users WHERE ?? = ?', [column, value]);
export const insert_user = (newUser: Users) => Query
    ('INSERT INTO Users SET ?', [newUser]);