import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'a1m2o3r4',
    database: 'postgresql'
});