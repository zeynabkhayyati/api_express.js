// create router for posting users info to the database

const express = require('express')
const usersRoutes = express.Router()
const DB = require('../DB/db')
const mysql = require('mysql')
const { json } = require('body-parser')

usersRoutes.post('/new-user' , (req , res) =>{ 

// connected to the database
    let date = new Date()
    date = date.toLocaleString("en-US")
    let body = req.body
    let insert_user = `INSERT INTO users VALUES (NULL , "${body.username}"  , "${body.email}" , "${body.password}" , "${date}")`

    // if (error == true) --> error is full or (error == false) --> error is empty
    DB.query(insert_user , (error , result)=>{

        if(error){

            console.log("we cant inserted a user" , error);
            res.send("null")

        }else{

            console.log("one user inserted");
            res.send("true")

        }
    })
})


// for select all users from database and send to html panel admin
usersRoutes.get('/all-users' , (req , res) => {

    let select_user = 'SELECT * FROM users'
    
    // if (error == true) --> error is full or (error == false) --> error is empty
    DB.query(select_user , (error , result) => {

        if(error){

            console.log("we cant selected users" , error);
            res.send("null")

        }else{

            console.log("users selected");
            // res.send("true")
            res.send(result)
        }
    })
})

// for deleted users from panel admin
usersRoutes.delete('/delete/:id' , (req , res) => {
    let user_id = req.params.id;
    let delete_user = `DELETE FROM users WHERE id = ${user_id}`
    
    // if (error == true) --> error is full or (error == false) --> error is empty
    DB.query(delete_user , (error , result) => {

        if(error){

            console.log("we cant delete user" , error);
            res.send("null")

        }else{

            console.log("users deleted");
            // res.send("true")
            res.send(result)
        }
    })
})

// for deleted users from panel admin
usersRoutes.put('/edit/:id' , (req , res) => {
    let user_id = req.params.id
    let body = req.body
    let update_user = `UPDATE users SET username="${body.username}" , email="${body.email}" , password="${body.password}" WHERE id=${user_id}`
    
    // if (error == true) --> error is full or (error == false) --> error is empty
    DB.query(update_user , (error , result) => {

        if(error){
            
            console.log("we cant update user" , error);
            res.send("null")

        }else{

            console.log("users updated");
            // res.send("true")
            res.send(result)
        }
    })
})
module.exports = usersRoutes