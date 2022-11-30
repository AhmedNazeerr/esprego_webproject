const express=require('express')
const app=express()
const path=require("path")
const bodyparser=require('body-parser');
const port=3000
app.set('view engine', 'ejs');
const Routes = require("./routes/routing");
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname,'views')))
app.use("/", Routes);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

