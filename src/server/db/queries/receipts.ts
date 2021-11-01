import { Query } from "..";
import { Receipts } from "../../../../types";

export const get_receipts = () => Query<Receipts[]>
    ('SELECT * FROM Receipts');
export const post_receipt = (newReceipt: Receipts) => Query
    ('INSERT INTO Receipts SET ?', [newReceipt]);
