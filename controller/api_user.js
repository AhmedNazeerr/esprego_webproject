const mysql=require('mysql');
const dotenv=require('dotenv').config();
//data base connection
var connection = mysql.createConnection({
    host:  `${dotenv.parsed.hostname}`,
    user: `${dotenv.parsed.username}`,
    password: `${dotenv.parsed.password}`,
    database: `${dotenv.parsed.databasename}`,
  });
  //connection checker
  connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected");
  });
   
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: `${dotenv.parsed.Service}`,
    host: `${dotenv.parsed.Host}`,
    port: `${dotenv.parsed.Port}`,
    secure: `${dotenv.parsed.Secure}`,
    auth: {
      user:`${dotenv.parsed.mail_user}`,
      pass:`${dotenv.parsed.mail_pass}`// naturally, replace both with your real credentials or an application-specific password
    },
  });

const pdf = require("html-pdf");
const fs = require("fs");
var valid = require("validator");
const path=require('path')
exports.getuseradmin = (req, res) => {
    if (req.session.role == "admin") {
      var query = "select * from account";
      connection.query(query, (err, row, fields) => {
        if (err) throw err;
        res.render("page/ourusers", { action: "list", data: row ,message:req.flash('message')});
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //showing users data in form
  exports.updateuser = (req, res) => {
    if (req.session.role == "admin") {
      var id = req.query.id;
      var tempquery = "SELECT * FROM `account` WHERE `username` = ?";
      connection.query(tempquery, [id], (err, row) => {
        if (!err) {
          res.render("page/ouruserupdate", { data: row });
        } else console.log(err);
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //updating product data in form
  exports.updateuserpost = (req, res) => {
    if (req.session.role == "admin") {
      var id = req.body.userid;
      var role;
      if(req.body.userrole=="admin"){
        console.log("admin")
        role="admin"
      }
      else{
        console.log("user")  
        role="user"
      }
      var query = `update account set role='${role}' where username='${id}'`;
      connection.query(query, (err) => {
        if (!err) {
          var del=`delete from orderdetails where username='${id}'`;
          connection.query(del,(err)=>{
            var del=`delete from earndetails where username='${id}'`;
            connection.query(del,(err)=>{
              var del=`delete from payment where username='${id}'`;
              connection.query(del,(err)=>{
                var del=`delete from cart where username='${id}'`;
                connection.query(del,(err)=>{
                  var del=`delete from reply where username='${id}'`;
                  connection.query(del,(err)=>{
                    var del=`delete from wishlist where username='${id}'`;
                    connection.query(del,(err)=>{
                      req.flash('message','user updated successfully')
                    res.redirect("/admin/user");
                    })
                  })
                })
              })
            })
          })
       
        } else {
          console.log("error in update");
        }
      });
    } else {
      res.redirect("/home");
    }
  };
  //del user data
  exports.deluser = (req, res) => {
    if (req.session.role == "admin") {
      var check = req.params.id;
      if (req.params.id == "admin") {
        console.log("owner cannot be deleted");
        res.redirect("/admin/user");
      } else {
        var tempquery = `DELETE FROM account WHERE username ='${check}' `;
        connection.query(tempquery, (err, row, fields) => {
          if (!err) {
            req.flash('message','user deleted successfully')
            res.redirect("/admin/user");
          } else console.log(err);
        });
      }
    } else {
      res.redirect("/home");
    }
  };
  