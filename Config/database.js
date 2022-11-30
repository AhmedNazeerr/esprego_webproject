const mysql=require('mysql');
//data base connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webproject",
  });
  //connection checker
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
  });
  module.exports=connection;