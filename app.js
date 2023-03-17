//Instalaciones
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Routes
const botinesRouter = require('./routes/botines');
const loginRouter = require('./routes/login')

//Connect MongoDB
const { connect } = require('./db/db');

//Express
const app = express();

//Usos con Express
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))


//Colocacion de Routes
app.use('/botines', botinesRouter);
app.use('/login', loginRouter)


//Connect
connect();

module.exports = app