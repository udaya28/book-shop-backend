import * as mysql from "mysql";
const dotenv = require('dotenv');
dotenv.config();

const Connection = mysql.createPool({
    host: process.env.DB_HOST_SQL,
    user: process.env.DB_USER_SQL,
    password: process.env.DB_PASSWORD_SQL,
    database: process.env.DB_NAME_SQL
});

export default Connection;