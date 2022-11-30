const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
const fs = require("fs");
var valid = require("validator");
const path=require('path')
exports.getuseradmin = (req, res) => {
    if (req.session.role == "admin") {
      var query = "select * from account";
      connection.query(query, (err, row, fields) => {
        if (err) throw err;
        res.render("page/ourusers", { action: "list", data: row });
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
      var role = req.body.userrole;
      var query = `update account set role='${role}' where username='${id}'`;
      connection.query(query, (err) => {
        if (!err) {
          res.redirect("/admin/user");
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
            res.redirect("/admin/user");
          } else console.log(err);
        });
      }
    } else {
      res.redirect("/home");
    }
  };
  