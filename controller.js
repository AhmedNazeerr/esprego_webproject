const express=require('express')
// const bcrypt = require("bcrypt") 
var flash = require('connect-flash');
var session = require('express-session')
const app=express()
const path=require("path")
const port=3000
app.set('view engine', 'ejs');

const Routes = require("./routes/routing");
const Routes_admin_team = require("./routes/t_admin");
const Routes_admin_product = require("./routes/p_admin");
const Routes_admin_user = require("./routes/u_admin");
const Routes_auth = require("./routes/auth_route");
const Routes_pdf = require("./routes/pdf_route");


var cookieParser = require('cookie-parser')
// const jwt=require('jsonwebtoken')
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
app.use("/", Routes_admin_team);
app.use("/", Routes_admin_product);
app.use("/", Routes_admin_user);
app.use("/", Routes_auth);
app.use("/", Routes_pdf);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

