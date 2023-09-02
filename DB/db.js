// connection to the database


const mysql = require('mysql')

const DB = mysql.createConnection({
    host : 'localhost' , 
    password : "" , 
    database : 'users' , 
    user : 'root'
})

module.exports = DB
