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

// const pdf = require("html-pdf");
// const fs = require("fs");
var valid = require("validator");
const e = require("connect-flash");
const { EVALUATION_SCRIPT_URL } = require("puppeteer");
// const { hash } = require("bcrypt");
// const path=require('path')

exports.addtocart = (req, res) => {
  var username = req.session.username;
  if (username) {
    var prodid = req.body.prodid;
    var count = req.body.count;
    var checkalreadyexsist = `select * from cart where username='${username}' and prodid='${prodid}'`;
    connection.query(checkalreadyexsist, (err, result) => {
      if (err) throw err;
      else {
        if (result.length > 0) {
          console.log("product already exists in the cart");
          req.flash('message','Product already exists inthe cart ')
          res.redirect(`/usercart`);
        } else {
          var getproductdetail = `select * from productdetails where prodid='${prodid}'`;
          connection.query(getproductdetail, (err, row) => {
            if (err) throw err;
            else {
              var leftover = row[0].prodinstock - count;
              var totalgen = count * row[0].prodprice;
              var insertintocart = `insert into cart(username,prodid,prodname,prodprice,prodimg,count,total) values('${username}','${prodid}','${row[0].prodname}','${row[0].prodprice}','${row[0].prodimg}','${count}','${totalgen}')`;
              connection.query(insertintocart, (err) => {
                if (err) throw err;
                else {
                  console.log("product added to cart");
                  var lessproduct = `update productdetails set prodinstock='${leftover}' where prodid='${prodid}'`;
                  connection.query(lessproduct, (err) => {
                    if (err) throw err;
                    else {
                      req.flash('message','Successfully added to cart')
                      res.redirect(`/usercart`);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  } else {
    console.log("login in first");
    req.flash('message','login or signup,in order to use cart')
    res.redirect("/account");
  }
};

exports.getusercart = (req, res) => {
  if (req.session.role == "user") {
    console.log(`${req.session.username}`);
    var query = `select * from cart where username='${req.session.username}'`;
    connection.query(query, (err, row) => {
      if (err) throw err;
      console.log(row);
      var getcartcount = `SELECT COUNT(*) AS namesCount FROM cart where username='${req.session.username}'`;
      connection.query(getcartcount, (err, resultant) => {
        if (err) throw err;
        else {
          if (resultant.length > 0) {
            var subtotal = `SELECT  total, SUM(total) AS Total FROM cart where username='${req.session.username}'`;
            connection.query(subtotal, (err, resu) => {
              if (err) throw err;
              else {
                if (resu.length > 0) {
                  res.render("page/usercart", {
                    data: row,
                    pageitem: resultant[0].namesCount,
                    subtotals: resu[0].Total,
                    message:req.flash('message')
                  });
                } else {
                  console.log("total is zero");
                }
              }
            });
          } else {
            console.log("cart is empty");
          }
        }
      });
    });
  } else {
    res.redirect("/home");
  }
};

exports.increasecount = (req, res) => {
  if (req.session.role == "user") {
    var id = req.params.id;
    var usernam = req.session.username;
    var oldval;
    var newval;
    var getoldcount = `select * from cart where username='${usernam}' and id='${id}'`;
    connection.query(getoldcount, (err, reso) => {
      if (err) throw err;
      else {
        if (reso.length > 0) {
          // query pehla sy exsisting prodinstock ki
          var exsiststock = `select * from productdetails where prodid='${reso[0].prodid}'`;
          connection.query(exsiststock, (err, resuls) => {
            if (err) throw err;
            else {
              console.log(reso[0].prodid);
              console.log(reso[0].count);
              console.log(resuls[0].prodinstock);

              if (reso[0].count < resuls[0].prodinstock) {
                newval = reso[0].count + 1;
                prodval = resuls[0].prodinstock - 1;
                if (prodval < 0) {
                  prodval = 0;
                }
                var update = `update productdetails set prodinstock='${prodval}' where prodid='${reso[0].prodid}'`;
                connection.query(update, (err) => {
                  if (err) throw err;
                  else {
                    var totalgen = newval * reso[0].prodprice;
                    var query = `update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
                    connection.query(query, (err) => {
                      if (err) throw err;
                      else {
                        console.log("count incremented by 1");
                        req.flash('message','incremented by 1')
                        res.redirect("/usercart");
                      }
                    });
                  }
                });
                console.log(newval);
              } else if (reso[0].count > resuls[0].prodinstock) {
                if (resuls[0].prodinstock > 0) {
                  newval = reso[0].count + 1;
                  prodval = resuls[0].prodinstock - 1;
                  if (prodval < 0) {
                    prodval = 0;
                  }
                  var update = `update productdetails set prodinstock='${prodval}' where prodid='${reso[0].prodid}'`;
                  connection.query(update, (err) => {
                    if (err) throw err;
                    else {
                      var totalgen = newval * reso[0].prodprice;
                      var query = `update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
                      connection.query(query, (err) => {
                        if (err) throw err;
                        else {
                          console.log("count incremented by 1");
                          req.flash('message','incremented by 1')
                          res.redirect("/usercart");
                        }
                      });
                    }
                  });
                } else if (resuls[0].prodinstock == 0) {
                  newval = reso[0].count;
                  prodval = resuls[0].prodinstock - 1;
                  if (prodval < 0) {
                    prodval = 0;
                  }
                  var update = `update productdetails set prodinstock='${prodval}' where prodid='${reso[0].prodid}'`;
                  connection.query(update, (err) => {
                    if (err) throw err;
                    else {
                      var totalgen = newval * reso[0].prodprice;
                      var query = `update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
                      connection.query(query, (err) => {
                        if (err) throw err;
                        else {
                          console.log("count incremented by 1");
                          req.flash('message','incremented by 1')
                          res.redirect("/usercart");
                        }
                      });
                    }
                  });
                }
              } else {
                newval = reso[0].count + resuls[0].prodinstock;
                prodval = resuls[0].prodinstock - 1;
                if (prodval < 0) {
                  prodval = 0;
                }
                var update = `update productdetails set prodinstock='${prodval}' where prodid='${reso[0].prodid}'`;
                connection.query(update, (err) => {
                  if (err) throw err;
                  else {
                    var totalgen = newval * reso[0].prodprice;
                    var query = `update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
                    connection.query(query, (err) => {
                      if (err) throw err;
                      else {
                        console.log("count incremented by 1");
                        req.flash('message','incremented by 1')
                        res.redirect("/usercart");
                      }
                    });
                  }
                });
              }
            }
          });
        } else {
          console.log("no count val");
        }
      }
    });
  } else {
    res.redirect("/home");
  }
};
exports.decreasecount = (req, res) => {
  if (req.session.role == "user") {
    var id = req.params.id;
    var usernam = req.session.username;
    var getoldcount = `select * from cart where username='${usernam}' and id='${id}'`;
    connection.query(getoldcount, (err, reso) => {
      if (err) throw err;
      else {
        if (reso.length > 0) {
          var exsiststock = `select * from productdetails where prodid='${reso[0].prodid}'`;
          connection.query(exsiststock, (err, resuls) => {
            if (err) throw err;
            else {
              if (reso[0].count == 1) {
                newval = reso[0].count;
                prodval = resuls[0].prodinstock;
              } else if (resuls[0].prodinstock == 0) {
                if (reso[0].count > 0) {
                  newval = reso[0].count - 1;
                  prodval = resuls[0].prodinstock + 1;
                  if (newval == 0) {
                    newval = 1;
                    prodval = resuls[0].prodinstock - 1;
                  }
                }
              } else if (reso[0].count < resuls[0].prodinstock) {
                if (reso[0].count > 0) {
                  newval = reso[0].count - 1;
                  prodval = resuls[0].prodinstock + 1;
                  if (newval == 0) {
                    newval = 1;
                    prodval = resuls[0].prodinstock - 1;
                  }
                }
              } else if (reso[0].count > resuls[0].prodinstock) {
                if (reso[0].count > 0) {
                  newval = reso[0].count - 1;
                  prodval = resuls[0].prodinstock + 1;
                  if (newval == 0) {
                    newval = 1;
                    prodval = resuls[0].prodinstock - 1;
                  }
                } else if (resuls[0].prodinstock == 0) {
                  newval = reso[0].count;
                  prodinstock = 0;
                }
              }
              var totalgen = newval * reso[0].prodprice;
              var update = `update productdetails set prodinstock='${prodval}' where prodid='${reso[0].prodid}'`;
              connection.query(update, (err) => {
                if (err) throw err;
                else {
                  var query = `update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
                  connection.query(query, (err) => {
                    if (err) throw err;
                    else {
                      console.log("count decremented by 1");
                      req.flash('message','decremented by 1')
                      res.redirect("/usercart");
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  } else {
    res.redirect("/home");
  }
};
exports.deletecart = (req, res) => {
  var username = req.session.username;
  if (username) {
    var id=req.params.id;
    var query=`select * from cart where id='${id}'`;
connection.query(query,(err,result)=>{
  if(err) throw err;
  else{
    var getproduct=`select * from productdetails where prodid='${result[0].prodid}'`;
    connection.query(getproduct,(err,results)=>{
      if(err) throw err 
      else{
      var oldstock=results[0].prodinstock;
      var oldcount=result[0].count;
      var newstock=oldstock+oldcount;
      var delquery=`DELETE FROM cart WHERE id='${id}'`;
      connection.query(delquery,(err,resu)=>{
        if(err) throw err
        else{
          var update=`update productdetails set prodinstock='${newstock}' where prodid='${result[0].prodid}'`;
          connection.query(update,(err)=>{
            if(err) throw err
            else{
              console.log('successfull deletion of cart item')
              req.flash('message','successfull deletion of cart item')
              res.redirect('/usercart')
            }
          })
        }
      })
      }
    })
  }
})
     
  } else {
    console.log("login in first");
    req.flash('message','login or signup,in order to use cart')
    res.redirect("/account");
  }
};