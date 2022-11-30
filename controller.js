const express=require('express')
const bcrypt = require("bcrypt") 
var flash = require('connect-flash');
var session = require('express-session')
const app=express()
const path=require("path")
const bodyparser=require('body-parser');
const port=3000
app.set('view engine', 'ejs');
const Routes = require("./routes/routing");
var cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
// cookie parser middleware
app.use(cookieParser());
//expiry date
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "secretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// a variable to save a session
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'views')))
app.use("/", Routes);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

