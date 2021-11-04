import * as mysql from 'mysql';
import { mysqlResponse } from '../../../types';
import { sqlConfig } from '../config';

const pool = mysql.createPool(sqlConfig);

export const Query = <T = mysqlResponse>(queryString: string, values?: any) => {
    return new Promise <T>((resolve, reject) => {
        const formattedSQL = mysql.format(queryString, values);
        pool.query(queryString, values, (error, results) => {
            console.log(formattedSQL);
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}