import db from "./db";
import { Tables } from "../config/db.mysql.config";

export class StoreMySqlModel {
    constructor() { }
    public static insertBookIntoStore = async (bookId: string | number, count: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.SHOPS} (bookId, count) VALUES ('${bookId}', '${count}')`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res.insertId)
            });
        });

    }

    public static getShopBookById = async (id: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.SHOPS}.id, ${Tables.SHOPS}.bookId,  ${Tables.SHOPS}.count, ${Tables.BOOKS}.title, ${Tables.BOOKS}.price, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country, ${Tables.BOOKS}.title, GROUP_CONCAT(${Tables.GENRES}.genre) as "genre" 
                FROM ${Tables.SHOPS}
                INNER JOIN ${Tables.BOOKS} ON ${Tables.SHOPS}.id = ${Tables.BOOKS}.id
                INNER JOIN ${Tables.AUTHORS} ON ${Tables.BOOKS}.authorId = ${Tables.AUTHORS}.id
                INNER JOIN ${Tables.GENRES_LIST} ON ${Tables.BOOKS}.id = ${Tables.GENRES_LIST}.bookId
                INNER JOIN ${Tables.GENRES} ON ${Tables.GENRES_LIST}.genreId = ${Tables.GENRES}.id
                WHERE ${Tables.SHOPS}.bookId=${id}
                GROUP BY  ${Tables.BOOKS}.id
                      `, (err, res) => {
                if (err) {
                    return reject(err)
                }
                if (res.length) {
                    return resolve(res);
                }
                return resolve(null);
            });
        });

    }



    public static getAllBooksFromShop = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.SHOPS}.id, ${Tables.SHOPS}.bookId,  ${Tables.SHOPS}.count, ${Tables.BOOKS}.title, ${Tables.BOOKS}.price, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country, ${Tables.BOOKS}.title, GROUP_CONCAT(${Tables.GENRES}.genre) as "genre" 
                    FROM ${Tables.SHOPS}
                    INNER JOIN ${Tables.BOOKS} ON ${Tables.SHOPS}.id = ${Tables.BOOKS}.id
                    INNER JOIN ${Tables.AUTHORS} ON ${Tables.BOOKS}.authorId = ${Tables.AUTHORS}.id
                    INNER JOIN ${Tables.GENRES_LIST} ON ${Tables.BOOKS}.id = ${Tables.GENRES_LIST}.bookId
                    INNER JOIN ${Tables.GENRES} ON ${Tables.GENRES_LIST}.genreId = ${Tables.GENRES}.id
                    GROUP BY  ${Tables.BOOKS}.id
                      `, (err, res) => {
                if (err) {
                    return reject(err)
                }
                if (res.length) {
                    return resolve(res);
                }
                return resolve(null);
            });
        });

    }

    public static updateAuthorById(id: string | number, bookId: string | number, count: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${Tables.SHOPS} SET bookId=?, count=?
             WHERE id=${id}`, [bookId, count], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }



    public static deleteShopBookById(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.SHOPS} WHERE ${Tables.SHOPS}.id=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }


}