import { Tables } from "../config/db.mysql.config";
import db from './../mysql/db';

export class GenreListSqlModel {
    constructor() { }

    public static insertGenreListWithBookId = async (bookId: string | number, genreId: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.GENRES_LIST} (bookId, genreId) VALUES ('${bookId}', '${genreId}')`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res.insertId)
            });
        });

    }

    public static getGenreListByBookId = async (id: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.GENRES_LIST}.id, ${Tables.GENRES_LIST}.bookId,  ${Tables.GENRES_LIST}.genreId
                      FROM ${Tables.GENRES_LIST} WHERE ${Tables.GENRES_LIST}.bookId=${id}
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


    public static getAllGenreList = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.GENRES_LIST}.id, ${Tables.GENRES_LIST}.bookId,  ${Tables.GENRES_LIST}.genreId
                    FROM ${Tables.GENRES_LIST}
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


    public static deleteGenreListByBookId(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.GENRES_LIST} WHERE ${Tables.GENRES_LIST}.bookId=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }

    public static deleteGenreListByGenreId(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.GENRES_LIST} WHERE ${Tables.GENRES_LIST}.id=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }





}


