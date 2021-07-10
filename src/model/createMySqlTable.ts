import { Tables } from './config/db.mysql.config';
import db from './mysql/db';


class CreateMySqlTable {
    constructor() {

    }

    private static createShopTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.SHOPS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.SHOPS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                bookId INT NOT NULL,
                count INT NOT NULL)
                `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }

    private static createBooksTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.BOOKS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.BOOKS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                title VARCHAR(255) NOT NULL,
                price INT NOT NULL,
                authorId INT NOT NULL)
                `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }


    private static createGenresTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.GENRES}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.GENRES} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                genre VARCHAR(255) NOT NULL)
                `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }


    private static createGenresListTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.GENRES_LISt}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.GENRES_LIST} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                bookId  INT NOT NULL,
                genreId INT NOT NULL)
                `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }



    private static createAuthorsTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.AUTHORS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.AUTHORS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                name VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL)
                `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }


    public static async createTables() {
        try {
            console.log("Creating shops table")
            await CreateMySqlTable.createShopTable();
        } catch (e) {
            console.error('CREATE SHOPS TABLE', e);
        }
        try {
            console.log("Creating books table")
            await CreateMySqlTable.createBooksTable();
        } catch (e) {
            console.error('CREATE BOOKS TABLE', e);
        }
        try {
            console.log("Creating genres table")
            await CreateMySqlTable.createGenresTable();
        } catch (e) {
            console.error('CREATE GENRES TABLE', e);
        }
        try {
            console.log("Creating genres list table")
            await CreateMySqlTable.createGenresListTable();
        } catch (e) {
            console.error('CREATE GENRES LIST TABLE', e);
        }
        try {
            console.log("Creating authors table")
            await CreateMySqlTable.createAuthorsTable();
        } catch (e) {
            console.error('CREATE AUTHORS TABLE', e);
        }

    }

}

export default CreateMySqlTable