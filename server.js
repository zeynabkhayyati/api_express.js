const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const DB = require('./DB/db')
const mysql = require('mysql')
const app = express()
const usersRoutes = require('./routes/usersRoutes')
const bodyParser = require('body-parser')

// for parsing data
app.use(bodyParser.json())

// using cors for cors error
app.use(cors())

// using from router
// app.use('/new-user' , usersRoutes)
// app.use('/all-users' , usersRoutes)
app.use('/' , usersRoutes)

app.listen(3000)