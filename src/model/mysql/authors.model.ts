import { Tables } from "../config/db.mysql.config";
import { Author } from "./../../interfaces";
import db from './../mysql/db';

export class AuthorSqlModel {
    constructor() { }

    public static insertAuthor = async (name: string, country: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.AUTHORS} (name, country) VALUES ('${name}', '${country}')`, (err, res) => {
                if (err) {
                    return reject(err)
                }
                return resolve(res.insertId)
            });
        });

    }

    public static getAuthorByName = async (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.AUTHORS}.id
                      FROM ${Tables.AUTHORS} WHERE ${Tables.AUTHORS}.name="${name}"
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
    public static getAuthorById = async (id: string | number): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.AUTHORS}.id, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country
                      FROM ${Tables.AUTHORS} WHERE ${Tables.AUTHORS}.id=${id}
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
    public static getAllAuthor = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.AUTHORS}.id, ${Tables.AUTHORS}.name, ${Tables.AUTHORS}.country
                      FROM ${Tables.AUTHORS}
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

    
    public static updateAuthorById(id: string | number,name: string, country: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${Tables.AUTHORS} SET name=?, country=?
             WHERE id=${id}`, [name, country], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }


    public static deleteAuthorById(id: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${Tables.AUTHORS} WHERE ${Tables.AUTHORS}.id=${id}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }


}


