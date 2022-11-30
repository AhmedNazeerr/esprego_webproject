const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
const fs = require("fs");
var valid = require("validator");
const path=require('path')
exports.getproductadmin = (req, res) => {
    if (req.session.role == "admin") {
      var query = "select * from productdetails";
      connection.query(query, (err, row, fields) => {
        if (err) throw err;
        res.render("page/adminproduct", { action: "list", data: row });
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //del product data
  exports.delproduct = (req, res) => {
    if (req.session.role == "admin") {
      var tempquery =
        "DELETE FROM `productdetails` WHERE `prodid` = " + req.params.id;
      connection.query(tempquery, (err, row, fields) => {
        if (!err) {
          res.redirect("/admin/product");
        } else console.log(err);
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //displaying form for adding new product
  exports.productadd = (req, res) => {
    if (req.session.role == "admin") {
      res.render("page/addproduct");
    } else {
      res.redirect("/home");
    }
  };
  
  //adding new product
  exports.addproduct = (req, res) => {
    if (req.session.role == "admin") {
      var pname = req.body.prodname;
      var bname = req.body.brandname;
      var quan = req.body.quantity;
      var desc = req.body.desc;
      var price = req.body.price;
      var wrant = req.body.wrant;
      var img = req.file.originalname;
      var addingdataquery =
        "INSERT INTO productdetails(prodname,prodbrandname,prodinstock,proddesc,prodimg,prodprice,prodwrant) VALUES ('" +
        pname +
        "','" +
        bname +
        "','" +
        quan +
        "','" +
        desc +
        "','" +
        img +
        "','" +
        price +
        "','" +
        wrant +
        "')";
      connection.query(addingdataquery, (err) => {
        if (err) throw err;
        res.redirect("/admin/product");
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //showing product data in form
  exports.updateproduct = (req, res) => {
    if (req.session.role == "admin") {
      var id = req.query.id;
      var tempquery = "SELECT * FROM `productdetails` WHERE `prodid` = ?";
      connection.query(tempquery, [id], (err, row) => {
        if (!err) {
          res.render("page/updateproduct", { data: row });
        } else console.log(err);
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //updating product data in form
  exports.updateproductpost = (req, res) => {
    if (req.session.role == "admin") {
      if (req.file) {
        var id = req.body.id;
        var pname = req.body.prodname;
        var bname = req.body.brandname;
        var quan = req.body.quantity;
        var desc = req.body.desc;
        var price = req.body.price;
        var wrant = req.body.wrant;
        var img = req.file.originalname;
        var query =
          "update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodimg=?,prodprice=?,prodwrant=? where prodid=?";
        var data = [pname, bname, quan, desc, img, price, wrant, id];
      } else {
        var id = req.body.id;
        var pname = req.body.prodname;
        var bname = req.body.brandname;
        var quan = req.body.quantity;
        var desc = req.body.desc;
        var price = req.body.price;
        var wrant = req.body.wrant;
        var query =
          "update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodprice=?,prodwrant=? where prodid=?";
        var data = [pname, bname, quan, desc, price, wrant, id];
      }
  
      connection.query(query, data, (err) => {
        if (!err) {
          res.redirect("/admin/product");
        } else {
          console.log("error in update");
        }
      });
    } else {
      res.redirect("/home");
    }
  };
  