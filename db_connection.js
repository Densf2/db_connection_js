'use_sctrict';

const mysql = require('mysql2')


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1", // change the parameter
    database: "userdb3" // change the parameter, also update the row afte rcreating the table
});

// Creation the database
connection.query("CREATE DATABASE userdb3",
    function(err, results) {
        if (err) console.log(err);
        else console.log('DB userdb3 created');
    }
);

// Creation the table
const sql = `CREATE TABLE if not exists users(
    id int primary key auto_increment,
    name varchar(255) not null,
    age int not null
)`;

connection.query(sql, function(err, results) {
    if (err) console.log(err);
    else console.log('Created table user in the userdb3')
});

// adding the one row of data to the table
const sql_one_row_data = `INSERT INTO users(name, age) VALUES('Tom', 20)`;

connection.query(sql_one_row_data, function(err, results) {
    if (err) console.log(err);
    else console.log('Added one row data into the table')
});


// adding the multiple rows data
const user_data = [
    ["Markus", 25],
    ["Oleg", 30],
    ["Sergei", 31],
];

const sql_few_row = `INSERT INTO users(name, age) VALUES ?`;

connection.query(sql_few_row, [user_data], function(err, results) {
    if (err) console.log(err);
    else console.log('Added few rows data into the table')
});

// receive the data from db
const sql_receive_data = `SELECT * FROM users`;

// used the nethod execute to connection DB
connection.execute(sql_receive_data, function(err, results) {
    if (err) console.log(err);
    else console.log(results);
});

// update the data in the table
const sql_update_row = `UPDATE users SET age=? WHERE name=?`;
const data = [90, 'Oleg'];

connection.query(sql_update_row, data, function(err, results) {
    if (err) console.log(err);
    else console.log('Updated the row');
    console.log(results);
});

// delete the data from db

const sql_delete = `DELETE FROM users WHERE name=?`;
const data = ['Markus']

connection.query(sql_delete, data, function(err, results) {
    if (err) console.log(err);
    else console.log('Deleted the row from db');
    console.log(results);
});

connection.end();