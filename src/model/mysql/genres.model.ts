import { Tables } from "../config/db.mysql.config";
import db from './../mysql/db';

export class GenreSqlModel {
    constructor() { }

    public static insertGenre = async (genre: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.GENRES} (genre) VALUES ('${genre}')`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res.insertId)
            });
        });

    }

    public static getGenreById = async (id: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.GENRES}.id, ${Tables.GENRES}.genre
                      FROM ${Tables.GENRES} WHERE ${Tables.GENRES}.id=${id}
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
    public static getAllGenre = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.GENRES}.id, ${Tables.GENRES}.genre
                      FROM ${Tables.GENRES}
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

    public static updateGenreById(id: string | number, genre: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${Tables.GENRES} SET genre=?
             WHERE id=${id}`, [genre], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }



    public static deleteGenreById(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.GENRES} WHERE ${Tables.GENRES}.id=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }


}


