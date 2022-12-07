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
const flash=require('connect-flash')

const pdf = require("html-pdf");
const fs = require("fs");
var valid = require("validator");
const path=require('path')
exports.getproductadmin = (req, res) => {
    if (req.session.role == "admin") {
      var query = "select * from productdetails";
      connection.query(query, (err, row, fields) => {
        if (err) throw err;
        res.render("page/adminproduct", { action: "list", data: row ,message:req.flash('message')});
      });
    } else {
      res.redirect("/home");
    }
  };
  
  //del product data
  exports.delproduct = (req, res) => {
    if (req.session.role == "admin") {
      var query=`select orderid from eachorderdetails where prodid='${req.params.id}'`;
          connection.query(query,(err,rowz)=>{
            if(err) throw err;
            else{
              if(rowz.length>0){
              var del=`delete from orderdetails where id='${rowz[0].orderid}'`;
              connection.query(del,(err)=>{
                if(err) throw err
                else{
                  var tempquery =
                  "DELETE FROM `productdetails` WHERE `prodid` = " + req.params.id;
                connection.query(tempquery, (err, row, fields) => {
                  if (!err) {
                    req.flash('message','product deleted Successfully')
                    res.redirect("/admin/product");
                      }      
                  })
                  
                }
              })
            }else{
              var tempquery =
                  "DELETE FROM `productdetails` WHERE `prodid` = " + req.params.id;
                connection.query(tempquery, (err, row, fields) => {
                  if (!err) {
                    req.flash('message','product deleted Successfully')
                    res.redirect("/admin/product");
                      }      
                  })
            }
            }
          })
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
      var catg=req.body.catg;
      var item;
      if(catg=="menu"){
item="menu";
      }
      else if(catg=="beans"){
        item="beans";
      }
      else if(catg=="coffee"){
        item="coffee";
      }
      else if(catg=="blends"){
        item="blend";
      }
      var addingdataquery =`INSERT INTO productdetails(prodname,prodbrandname,prodinstock,proddesc,prodprice,prodwrant,prodimg,prodimg1,prodimg2,prodimg3,catg) VALUES ('${pname}','${bname}','${quan}','${desc}','${price}','${wrant}','${req.files[0].originalname}','${req.files[1].originalname}','${req.files[2].originalname}','${req.files[3].originalname}','${item}')`;
      connection.query(addingdataquery, (err) => {
        if (err) throw err;
        req.flash('message','product added Successfully')
        res.redirect("/admin/product")
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
      var id = req.body.id;
      var pname = req.body.prodname;
      var bname = req.body.brandname;
      var quan = req.body.quantity;
      var desc = req.body.desc;
      var price = req.body.price;
      var wrant = req.body.wrant;
      if (req.file) {
          if(req.files.length<4){
           res.redirect('/admin/product');
            }
            else{
        var query =
          `update productdetails set prodname='${pname}',prodbrandname='${bname}',prodinstock='${quan}',proddesc='${desc}',prodprice='${price}',prodwrant='${wrant}',prodimg='${req.files[0].originalname}',prodimg1='${req.files[1].originalname}',prodimg2='${req.files[2].originalname}',prodimg3='${req.files[3].originalname}' where prodid='${id}'`;
        // var data = [pname, bname, quan, desc, price, wrant, req.files[0].originalname, req.files[1].originalname, req.files[2].originalname, req.files[3].originalname,id];
      } 
    }
      else {
        var query =
          "update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodprice=?,prodwrant=? where prodid=?";
        var data = [pname, bname, quan, desc, price, wrant, id];
        connection.query(query,data, (err) => {
          if (!err) {
            req.flash('message','product updated Successfully')
            res.redirect("/admin/product");
          } else {
            console.log("error in update");
          }
        });
      }
      connection.query(query, (err) => {
        if (!err) {
          req.flash('message','product updated Successfully')
          res.redirect("/admin/product");
        } else {
          console.log("error in update");
        }
      });
    } else {
      res.redirect("/home");
    }
  };
  