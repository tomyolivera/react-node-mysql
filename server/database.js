const mysql = require('mysql');
              require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const insert = (connection, data, callback) => {
    let query = 'INSERT INTO users(name, email, password) VALUES(?, ?, ?)';
    query = mysql.format(query, [data.name, data.email, data.password]);

    connection.query(query, (err, result) => {
        if(err) return callback(err);
        callback(result);
    });
}

module.exports = { connection, insert }