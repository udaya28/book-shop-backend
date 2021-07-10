import { Tables } from './../config/db.mysql.config';
import { Book } from "./../../interfaces";
import db from './../mysql/db';

export class BookSqlModel {
    constructor() { }

    public static insertBook = async (title: string, price: number, authorId: number | string): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.BOOKS} (title, price, authorId) VALUES ('${title}', '${price}', '${authorId}')`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res.insertId)
            });
        });

    }

    public static getBookById = async (id: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.BOOKS}.id, ${Tables.BOOKS}.title, ${Tables.BOOKS}.price, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country, GROUP_CONCAT(genres.genre) as "genre"
                FROM ${Tables.BOOKS} 
                INNER JOIN ${Tables.AUTHORS} ON ${Tables.BOOKS}.authorId=${Tables.AUTHORS}.id
                INNER JOIN ${Tables.GENRES_LIST} ON ${Tables.BOOKS}.id = ${Tables.GENRES_LIST}.bookId
                INNER JOIN ${Tables.GENRES} ON ${Tables.GENRES_LIST}.genreId = ${Tables.GENRES}.id
                WHERE ${Tables.BOOKS}.id=${id}
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
    public static getAllBook = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.BOOKS}.id, ${Tables.BOOKS}.title, ${Tables.BOOKS}.price, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country, GROUP_CONCAT(genres.genre) as "genre"
                    FROM ${Tables.BOOKS} 
                    INNER JOIN ${Tables.AUTHORS} ON ${Tables.BOOKS}.authorId=${Tables.AUTHORS}.id
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


    public static deleteBookById(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.BOOKS} WHERE ${Tables.BOOKS}.id=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }


}


