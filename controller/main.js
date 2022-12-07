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
const flash = require("connect-flash");
var Publishable_Key =
  "pk_test_51MAYfpAwwbDag0BAeneNbXYjmnStdxjmvnqp9DDD5Nu4FJXZRKATZ29gXMVr3vexVcmxkEKd7DhOTmmQr3JEvscz008f6oygMh";
var Secret_Key =
  "sk_test_51MAYfpAwwbDag0BAoo6Far5nMhrrj8vtIeQO7jCbxxbmqiwDqlF6HJGaKuUwnWRggVftWrUZ8FYwxUiev0BEZ4Is00Amck2Esa";
const stripe = require("stripe")(Secret_Key);
// const pdf = require("html-pdf");
// const fs = require("fs");
var valid = require("validator");
const e = require("connect-flash");
// const { hash } = require("bcrypt");
// const path=require('path')

//for home page
exports.servehome = (req, res) => {
  var get='select * from faq';
  connection.query(get,(err,row)=>{ 
       if(err) throw err
    else{
      res.render("../views/page/home",{faq:row,message:req.flash('message')});
    }
  })
};

exports.contactadmin = (req, res) => {
  if (req.session.role == "admin") {
    var query = `Select * from contactus`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      else {
        res.render("../views/page/admin_contact", { data: result ,message:req.flash('message')});
      }
    });
  } else {
    res.redirect("/home");
  }
};

// for contact form
exports.contactus = (req, res) => {
  var nname = req.body.contactname;
  var ename = req.body.contactemail;
  var mname = req.body.contactmessage;
  if (valid.isEmail(ename)) {
    const mailOptions = {
      from: "esprego.coffe@gmail.com",
      to: ename,
      subject: "Contact",
      text: `Please do not reply to this email as it will not be received.This is to let you know that we have received your email and one of our representative will contact you soon.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
; req.flash('message','error in sending mail try again later')
            res.redirect("/home");
      } else {
        console.log("Email sent: " + info.response);
        var querycontact = `insert into contactus(name,email,message) values ('${nname}','${ename}','${mname}')`;
        connection.query(querycontact, (err) => {
          if (err) throw err;
          else {
            console.log("response submitted successfully");
            req.flash('message','Thankyou for Contacting us,We will reach out to you soon')
            res.redirect("/home");
          }
        });
      }
    });
  } else {
    console.log("invalid email");
    req.flash('message','invlad email address')
    res.redirect('/home');
  }
};

exports.customer_admin = (req, res) => {
  if (req.session.role == "admin") {
    var id = req.query.id;
    var tempquery = "SELECT * FROM `contactus` WHERE `id` = ?";
    connection.query(tempquery, [id], (err, row) => {
      if (!err) {
        res.render("page/customer_support", { data: row });
      } else console.log(err);
    });
  } else {
    res.redirect("/home");
  }
};

exports.customer_admin_post = (req, res) => {
  if (req.session.role == "admin") {
    var admin_useri = req.body.admin_userid;
    var admin_messag = req.body.admin_message;
    var admin_mail = req.body.admin_email;
    console.log(admin_mail, admin_messag, admin_useri);
    const mailOptions = {
      from: "esprego.coffe@gmail.com",
      to: admin_mail,
      subject: "Addressing Your Query",
      text: `${admin_messag}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        req.flash('message','Error is sending mail, try again later')
        res.redirect("/contactadmin");
      } else {
        console.log("Email sent: " + info.response);
        var query = `DELETE FROM contactus where id='${admin_useri}'`;
        connection.query(query, (err) => {
          if (err) throw err;
          else {
            console.log("data deleted sucessfully");
            req.flash('message','Responce Sent Successfully')
            res.redirect("/contactadmin");
          }
        });
      }
    });
  } else {
    res.redirect("/home");
  }
};

exports.updateloguser = (req, res) => {
  if (req.session.role == "user") {
    var query = `select * from account where username='${req.session.username}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      else {
        res.render("page/detailupdate", { data: result });
      }
    });
  } else {
    res.redirect("/home");
  }
};

exports.userdash = (req, res) => {
  if (req.session.role == "user") {
    var query = `SELECT * FROM(SELECT * FROM orderdetails order BY id DESC LIMIT 5 ) AS sub  where username='${req.session.username}' order BY id asc`;
    connection.query(query, (err, result) => {
      if (err) throw err; 
      var paymentget=` SELECT * FROM(SELECT * FROM payment order BY id DESC LIMIT 5 ) AS sub  where username='${req.session.username}' order BY id asc`;
      connection.query(paymentget,(err,row)=>{
        if(err) throw err
        else{
          res.render("page/userdash", { data: req.session.username, row: result ,data1:row});
        }
      })
    });
  } else {
    res.redirect("/home");
  }
};

exports.updateuserpost = (req, res) => {
  if (req.session.role == "user") {
    if (req.file) {
      var username = req.session.username;
      var email = req.body.email;
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var addr = req.body.address;
      var img = req.file.originalname;
      var query =
        "update account set email=?,imgpath=?,firstname=?,lastname=?,address=? where username=?";
      var data = [email, img, fname, lname, addr, username];
    } else {
      var email = req.body.email;
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var addr = req.body.address;
      var idd = req.body.id;
      // var username = req.body.firstname;
      var query =
        "update account set email=?,firstname=?,lastname=?,address=? where username=?";
      var data = [email, fname, lname, addr, username];
    }
    connection.query(query, data, (err) => {
      if (!err) {
        res.redirect("/user_account");
      }
      console.log("error in update");
    });
  } else {
    res.redirect("/home");
  }
};

//for about us page
exports.serveaboutus = (req, res) => {
  res.render("../views/page/about");
};

// //getting all customers
// exports.getcustomer = (req, res) => {
//   var query = "select * from customer";
//   connection.query(query, (err, row, fields) => {
//     if (err) throw err;
//     res.render("page/index", { title: "Record", action: "list", data: row });
//   });
// };

//displaying teams page
exports.getteam = (req, res) => {
  it=0;
  var sql = `SELECT * FROM teamdetails `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const dataCountQuery = `SELECT COUNT(*) FROM teamdetails`;
      connection.query(dataCountQuery, function (err, result) {
          if (err) throw err;
  
          let dataCount = result[0]["COUNT(*)"];
          let pageNo = req.query.page ? req.query.page : 1;
          let dataPerPages = req.query.data ? req.query.data : 6;
          let startLimit = (pageNo - 1) * dataPerPages;
          if(startLimit<0){
            startLimit==1;
          }
          let totalPages = Math.ceil(dataCount / dataPerPages);
  
          const Query = `SELECT * FROM teamdetails LIMIT ${startLimit}, ${dataPerPages}`;
          connection.query(Query, function (err, result) {
              if (err) throw err;
              res.render("page/ourteam", {
                  data: result,
                  pages: totalPages,
                  CurrentPage: pageNo,
                  lastPage: totalPages,
                  it
              });
          })
      })
    }
  })
};

//displaying teams after search
exports.getsearchteam = (req, res) => {
  it = 0;
  var sname = req.query.sname;
  var sql = `SELECT * FROM teamdetails where  workerfname LIKE '%${sname}%'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const dataCountQuery = `SELECT COUNT(*) FROM teamdetails where  workerfname LIKE '%${sname}%'`;
      connection.query(dataCountQuery, function (err, result) {
          if (err) throw err;
  
          let dataCount = result[0]["COUNT(*)"];
          let pageNo = req.query.page ? req.query.page : 1;
          let dataPerPages = req.query.data ? req.query.data : 6;
          let startLimit = (pageNo - 1) * dataPerPages;
          if(startLimit<0){
            startLimit==1;
          }
          let totalPages = Math.ceil(dataCount / dataPerPages);
  
          const Query = `SELECT * FROM teamdetails where  workerfname LIKE '%${sname}%' LIMIT ${startLimit}, ${dataPerPages}`;
          connection.query(Query, function (err, result) {
              if (err) throw err;
              res.render("page/ourteam", {
                  data: result,
                  pages: totalPages,
                  CurrentPage: pageNo,
                  lastPage: totalPages,
                  it
              });
          })
      })
    }
   else{
    it =1;
    const dataCountQuery = `SELECT COUNT(*) FROM teamdetails where  workerfname LIKE '%${sname}%'`;
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 6;
        let startLimit = (pageNo - 1) * dataPerPages;
        if(startLimit<0){
          startLimit==1;
        }
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM teamdetails where  workerfname LIKE '%${sname}%' LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("page/ourteam", {
                data: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages,
                it
            });
        })
    })
   }
  });
};

//displaying product page
exports.getproduct = (req, res) => {
  const resultsPerPage = 9;
  let sql = "SELECT * FROM productdetails";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    if (page > numberOfPages) {
      res.redirect("/?page=" + encodeURIComponent(numberOfPages));
    }
    //Determine the SQL LIMIT starting number
    const startingLimit = (page - 1) * resultsPerPage;
    //Get the relevant number of POSTS for this starting page
    sql = `SELECT * FROM productdetails LIMIT ${startingLimit},${resultsPerPage}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      let iterator = page - 1 < 1 ? 1 : page - 1;
      let endingLink =
        iterator + 3 <= numberOfPages
          ? iterator + 3
          : page + (numberOfPages - page);
      if (endingLink < page + 0) {
        iterator -= page + 0 - numberOfPages;
      }

      res.render("page/ourproduct", {
        data: result,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};

//   displaying teams after search
// exports.searchproduct = (req, res)=>{
//   var it=0;
//     var pname=req.query.pname;
//     var sql="SELECT * FROM productdetails where prodname LIKE '%"+pname+"%'";
//     connection.query(sql,(err,result)=>{
//       if (err) throw err
//       if( result.length > 0){
//         res.render('page/oursearchproduct',{data:result,it})
//       }
//       it=100;
//  res.render('page/oursearchproduct',{data:result,it})
//     })
// }

exports.filterproduct = (req, res) => {
  var min = req.query.min;
  var max = req.query.max;
  var pname = req.query.pname;
  var catg = req.query.catg;
  var sort = req.query.sort;
  var it=1;
  console.log(min, max,pname,catg,sort);
  if(sort=="all"){
    if(catg=="all"){
    var sql = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' `;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const dataCountQuery = `SELECT COUNT(*) FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}'`;
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 6;
        let startLimit = (pageNo - 1) * dataPerPages;
        if(startLimit<0){
          startLimit==1;
        }
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' LIMIT ${startLimit}, ${dataPerPages} `;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("page/temp_prod", {
                data: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages,
                it
            });
        })
    })
      }
      else{
        it=0;
        const dataCountQuery = `SELECT COUNT(*) FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}'`;
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 6;
        let startLimit = (pageNo - 1) * dataPerPages;
        if(startLimit<0){
          startLimit==1;
        }
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("page/temp_prod", {
                data: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages,
                it
            });
        })
    })
      }
    });
  }else{


    var sql = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' `;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
       const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'`;
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 6;
        let startLimit = (pageNo - 1) * dataPerPages;
        if(startLimit<0){
          startLimit==1;
        }
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("page/temp_prod", {
                data: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages,
                it
            });
        })
    })
      }
      else{
        it=0;
        const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'`;
        connection.query(dataCountQuery, function (err, result) {
            if (err) throw err;
    
            let dataCount = result[0]["COUNT(*)"];
            let pageNo = req.query.page ? req.query.page : 1;
            let dataPerPages = req.query.data ? req.query.data : 6;
            let startLimit = (pageNo - 1) * dataPerPages;
            if(startLimit<0){
              startLimit==1;
            }
            let totalPages = Math.ceil(dataCount / dataPerPages);
    
            const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' LIMIT ${startLimit}, ${dataPerPages}`;
            connection.query(Query, function (err, result) {
                if (err) throw err;
                res.render("page/temp_prod", {
                    data: result,
                    pages: totalPages,
                    CurrentPage: pageNo,
                    lastPage: totalPages,
                    it
                });
            })
        })
      }
    });
  }

  }else if(sort=="asc"){
    if(catg=="all"){
      var sql = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid  asc`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid  asc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid  asc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
        else{
          it=0
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid  asc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid  asc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
  
      });
    }else{
      var sql = `SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'  ORDER BY prodid  asc `;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'  ORDER BY prodid  asc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'  ORDER BY prodid  asc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }

        else{
          it=0;
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'  ORDER BY prodid  asc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}'  ORDER BY prodid  asc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
  
      });
    }
  
  }
  else if(sort=="desc"){
    if(catg=="all"){
      var sql = `SELECT * FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid DESC`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid DESC`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails    where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid DESC LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
        else{
          it=0;
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid DESC`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' ORDER BY prodid DESC LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
  
      });
    }else{
      var sql = `SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' ORDER BY prodid  desc`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' ORDER BY prodid  desc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' ORDER BY prodid  desc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
        else{
          it=0;
          const dataCountQuery = `SELECT COUNT(*) FROM productdetails  where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' ORDER BY prodid  desc`;
          connection.query(dataCountQuery, function (err, result) {
              if (err) throw err;
      
              let dataCount = result[0]["COUNT(*)"];
              let pageNo = req.query.page ? req.query.page : 1;
              let dataPerPages = req.query.data ? req.query.data : 6;
              let startLimit = (pageNo - 1) * dataPerPages;
              if(startLimit<0){
                startLimit==1;
              }
              let totalPages = Math.ceil(dataCount / dataPerPages);
      
              const Query = `SELECT * FROM productdetails   where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}' and catg='${catg}' ORDER BY prodid  desc LIMIT ${startLimit}, ${dataPerPages}`;
              connection.query(Query, function (err, result) {
                  if (err) throw err;
                  res.render("page/temp_prod", {
                      data: result,
                      pages: totalPages,
                      CurrentPage: pageNo,
                      lastPage: totalPages,
                      it
                  });
              })
          })
        }
  
      });
    }
  }
 
};

exports.getteamdetail = (req, res) => {
  var tempquery =
    "SELECT  * FROM `teamdetails` WHERE `workerid` = " + req.params.id;
  connection.query(tempquery, (err, row, fields) => {
    if (!err) {
      res.render("page/memberdetails", { data: row });
    } else console.log(err);
  });
};

exports.getproductdetail = (req, res) => {
  var tempquery =
    "SELECT  * FROM `productdetails` WHERE `prodid` = " + req.params.id;
  connection.query(tempquery, (err, row, fields) => {
    if (!err) {
      var query = `select * from review where prodid='${req.params.id}'`;
      connection.query(query, (err, resu) => {
        if (err) throw err;
        else {
          var query2 = `select * from comment where prodid='${req.params.id}'`;
          connection.query(query2, (err, results) => {
            if (err) throw err;
            else {
              if (req.session.role == "user") {
                res.render("page/productdetails", {
                  data: row,
                  rev: resu,
                  temp: 1,
                  user: req.session.username,
                  comment: results,
                });
              } else {
                res.render("page/productdetails", {
                  data: row,
                  rev: resu,
                  temp: 0,
                  user: null,
                  comment: results,
                });
              }
            }
          });
        }
      });
    } else console.log(err);
  });
};

exports.getaccpage = (req, res) => {
  if (req.session.role == "admin") {
    res.redirect("/dash");
  } else if (req.session.role == "user") {
    res.redirect("/userdash");
  } else {
    if (!req.session.username) {
      res.render("page/login",{message:req.flash('message')});
    } else {
      res.redirect("/home");
    }
  }
};

exports.getdash = (req, res) => {
  if (req.session.role == "admin") {
    var query = ` SELECT * FROM(SELECT * FROM orderdetails order BY id DESC LIMIT 5) AS sub order BY id asc;`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      var query = ` SELECT * FROM(SELECT * FROM earndetails order BY id DESC LIMIT 5) AS sub order BY id asc;`;
      connection.query(query, (err, result1) => {
        if (err) throw err;
        else {
          var getearn=`SELECT SUM(subtotal) AS "Totals" FROM earndetails`; 
          connection.query(getearn,(err,row)=>{
            if(err) throw err
            else{
              var getusercount=`SELECT count(*) as count from account where role='user'`;
              connection.query(getusercount,(err,row1)=>{
                var getcount=`SELECT count(*) as counts from teamdetails`;
                connection.query(getcount,(err,row2)=>{
                  var getcount=`SELECT count(*) as count from pastorder`;
                  connection.query(getcount,(err,row3)=>{
                    var getcountw=`SELECT count(*) as count from productdetails`;
                    connection.query(getcountw,(err,row4)=>{
                      var query = ` SELECT * FROM(SELECT * FROM product order BY id DESC LIMIT 5) AS sub order BY id asc;`;
connection.query(query,(err,scrap)=>{
  res.render("page/dash", { data: result, dataearn: result1,earns:row[0].Totals ,usercount:row1[0].count,teamcount:row2[0].counts,pastorder:row3[0].count,product:row4[0].count,datascrap:scrap});
})
                  
                    })
           
                  })
           
                })
              })
             
            }
          })
      
        }
      });
    });
  } else {
    res.redirect("/home");
  }
};

exports.showall = (req, res) => {
  if (req.session.role == "admin") {
    var query = ` SELECT * FROM orderdetails`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/showall_order", { data: result });
    });
  } else {
    res.redirect("/home");
  }
};
exports.showallearn = (req, res) => {
  if (req.session.role == "admin") {
    var query = ` SELECT * FROM earndetails`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/showall_earn", { data: result });
    });
  } else {
    res.redirect("/home");
  }
};

exports.eachearn = (req, res) => {
  if (req.session.role == "admin") {
    var query = ` SELECT * FROM eachearndetails`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/eachearn_details", { data: result });
    });
  } else {
    res.redirect("/home");
  }
};
exports.changeuserpass = (req, res) => {
  if (req.session.role == "user") {
    res.render("page/changeuserpass", { data: req.session.username });
  } else {
    res.redirect("/home");
  }
};
exports.changeuserpasspost = async (req, res) => {
  var pold = req.body.oldp;
  var pnew = req.body.newp;
  var hashedpassword =pnew;
  var id = req.body.id;
  var query = `update account set password='${hashedpassword}' where username='${id}'`;
  var addingdataquery = `SELECT * FROM account WHERE username='${id}'`;
  connection.query(addingdataquery, (err, row) => {
    if (err) throw err;
    if (row.length && (pold==row[0].password)) {
      connection.query(query, (err) => {
        if (err) throw err;
        else {
          console.log("password updated successfully");
          res.redirect("/userdash");
        }
      });
      console.log("password match");
    } else {
      console.log("Old Password is incorrect");
      res.render("page/changeuserpass", { data: id });
    }
  });
};

// exports.addrev =(req, res) => {
//  if(req.session.role=="user"){
//   res.render('page/add_rev',{id:req.session.username,prodid:req.params.id});
//  }
//  else{
//   res.redirect('/product')
//  }
// };
exports.addrevpost = (req, res) => {
  if (req.session.role == "user") {
    var review = req.body.rev;
    var username = req.body.username;
    var id = req.body.prodid;
    var star = req.body.star;
    var query1 = `Insert  into review(prodid,username,review,star) values ('${id}','${username}','${review}','${star}')`;
    connection.query(query1, (err) => {
      if (err) throw err;
      console.log("review added successfully");
      res.redirect(`/productdetail/${id}`);
    });
  } else {
    res.redirect("/product");
  }
};

exports.renderreply = (req, res) => {
  if (req.session.username) {
    var revid = req.params.id;
    var prodid = req.params.prodid;
    var username = req.params.username;
    res.render("page/reply", {
      revid: revid,
      prodid: prodid,
      username: username,
    });
  } else {
    res.redirect("/account");
  }
};

exports.renderreplypost = (req, res) => {
  if (req.session.username) {
    var revid = req.body.revid;
    var prodid = req.body.prodid;
    var username = req.body.username;
    var reply = req.body.reply;
    var query = `insert into comment (username,prodid,reply,revid) values ('${username}','${prodid}','${reply}','${revid}')`;
    connection.query(query, (err) => {
      if (err) throw err;
      else {
        res.redirect(`/productdetail/${prodid}`);
      }
    });
  } else {
    res.redirect(`/productdetail/${prodid}`);
  }
};

const fs = require("fs");
const puppeteer = require("puppeteer");
const { concatSeries } = require("async");

exports.scrapper = (req, res) => {
  if (req.session.role=="admin") {
  async function run() {
    var query2 = "Select * from product";
    connection.query(query2, (err, results) => {
      if (err) throw err;
      else {
        if (results.length > 0) {
          var query1 = "DELETE FROM product";
          connection.query(query1, (err) => {
            if (err) throw err;
            else {
              console.log("old table data dropped");
            }
          });
        } else {
          console.log("table already empty");
        }
      }
    });
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.daraz.pk/catalog/?q=coffee&_keyori=ss&from=input&spm=a2a0e.home.search.go.35e34937YTDFfm"
    , {  timeout: 40000 });

    // Get products using $$eval
    const products = await page.$$eval("#root .inner--SODwy", (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".title--wFj93").innerText,
        price: e.querySelector(".price--NVB62 .currency--GVKjl").innerText,
      }))
    )
  
    //   console.log(products);

    //   Save data to JSON file
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("File saved");
    });

    //read data from file
    fs.readFile("product.json", (err, result) => {
      if (err) throw err;
      var resulttemp = JSON.parse(result);
      resulttemp.forEach((element) => {
        if (element.price == "") {
          var price = 350;
          var query = `insert into product(title,price) values ("${element.title}",'${price}')`;
          connection.query(query, (err) => {
            if (err) throw err;
            else {
              console.log("insertion successfull");
            }
          });
        } else {
          var query = `insert into product(title,price) values ("${element.title}",'${element.price}')`;
          connection.query(query, (err) => {
            if (err) throw err;
            else {
              console.log("insertion successfull");
            }
          });
        }
      });
    });

    await browser.close();
    res.redirect("/dash");
  }
  run();
  } else {
    res.redirect(`/home`);
  }
};

//  module.exports={findallcontacts};
exports.getcheckout = (req, res) => {
  if (req.session.username) {
    var username = req.body.username;
    var prodid = req.body.prodid;
    var total = req.body.total;
    var prodcount = req.body.prodcount;
    var cartid = req.body.cartid;
    var prodname = req.body.prodname;
    var subtotal = req.body.subtotal;
    var getuserdetails = `select * from account where username='${username}'`;
    connection.query(getuserdetails, (err, result) => {
      if (err) throw err;
      else {
        res.render("page/checkout", {
          username: username,
          prodid: prodid,
          total: total,
          prodcount: prodcount,
          cartid: cartid,
          email: result[0].email,
          cardno: result[0].cardno,
          cardname: result[0].cardname,
          cvv: result[0].cvv,
          prodname: prodname,
          subtotal: subtotal,
        });
      }
    });
  } else {
    res.redirect("/account");
  }
};

exports.postcheckout = (req, res) => {
  if (req.session.username) {
    var username = req.body.username;
    // var cardno=req.body.cardno;
    // var cardname=req.body.cardname;
    // var cvv=req.body.cvv;
    var zip = req.body.zip;
    var state = req.body.state;
    var city = req.body.city;
    var address = req.body.address;
    var cartid = req.body.cartid;
    var subtotal = req.body.subtotal;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    // prints date & time in YYYY-MM-DD format
    var dates = `${year}/${month}/${date}`;
    console.log(dates);
    var query = `select email from account where username='${username}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/charge", {
        username: username,
        zip: zip,
        state: state,
        city: city,
        address: address,
        cartid: cartid,
        subtotal: subtotal,
        key: Publishable_Key,
        dates: dates,
        email: result[0].email,
      });
    });
  } else {
    res.redirect("/account");
  }
};

exports.paymentpost = (req, res) => {
  var username = req.body.username;
  var subtotal = req.body.subtotal;
  var username = req.body.username;
  var zip = req.body.zip;
  var state = req.body.state;
  var city = req.body.city;
  var address = req.body.address;
  var cartid = req.body.cartid;
  var dates = req.body.dates;
  var cardno = req.body.cardno;
  var cvv = req.body.cvv;
  var month = req.body.month;
  var year = req.body.year;
  var carddate = `${month / year}`;
  var query = `select email from account where username='${username}'`;
  connection.query(query, (err, rows) => {
    if (err) throw err;

    const mailOptions = {
      from: "esprego.coffee@gmail.com",
      to: rows[0].email,
      subject: "Thankyou For Shopping",
      html: `<doctype html>
          <html>
          <head>
              <meta charset="utf-8">
              <title>Muskaan Dental Care Estimate Mail</title>
              <style>
                  .invoice-box {
                      background-color: #FFFFFF;
                      max-width: 800px;
                      margin: 30px 0;
                      padding: 30px;
                      border: 1px solid #eee;
                      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                      font-size: 16px;
                      line-height: 24px;
                      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                      color: #555;
                  }
      
                  .invoice-boxx {
                      background-image: url("http://images.alphacoders.com/458/458169.jpg");
                      max-width: 800px;
                      margin: auto;
                      padding: 30px;
                      border: 1px solid #eee;
                      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                      font-size: 16px;
                      line-height: 24px;
                      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                      color: #f7f7f7;
                  }
      
                  .btn {
                      background: #3cb0fd;
                      background-image: -webkit-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -moz-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -ms-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -o-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: linear-gradient(to bottom, #3cb0fd, #3cb0fd);
                      -webkit-border-radius: 4;
                      -moz-border-radius: 4;
                      border-radius: 4px;
                      font-family: Arial;
                      color: #ffffff;
                      font-size: 35px;
                      padding: 6px 16px 10px 20px;
                      text-decoration: none;
                  }
      
                  .btn:hover {
                      background: #3cb0fd;
                      background-image: -webkit-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -moz-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -ms-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: -o-linear-gradient(top, #3cb0fd, #3cb0fd);
                      background-image: linear-gradient(to bottom, #3cb0fd, #3cb0fd);
                      text-decoration: none;
                  }
      
                  .invoice-box table {
                      width: 100%;
                      line-height: inherit;
                      text-align: left;
                  }
      
                  .invoice-box table td {
                      padding: 5px;
                      vertical-align: top;
                  }
      
                  .invoice-box table tr td:nth-child(2) {
                      text-align: right;
                  }
      
                  .invoice-box table tr.top table td {
                      padding-bottom: 20px;
                  }
      
                  .invoice-box table tr.top table td.title {
                      font-size: 45px;
                      line-height: 45px;
                      color: #333;
                  }
      
                  .invoice-box table tr.information table td {
                      padding-bottom: 40px;
                  }
      
                  .invoice-box table tr.heading td {
                      background: #EEEEE0;
                      border-bottom: 1px solid #ddd;
                      font-weight: bold;
                  }
      
                  .invoice-box table tr.details td {
                      padding-bottom: 20px;
                  }
      
                  .invoice-box table tr.item td {
                      border-bottom: 1px solid #eee;
                  }
      
                  .invoice-box table tr.item.last td {
                      border-bottom: none;
                  }
      
                  .invoice-box table tr.total td:nth-child(2) {
                      border-top: 2px solid #eee;
                      font-weight: bold;
                  }
      
                  @media only screen and (max-width: 600px) {
                      .invoice-box table tr.top table td {
                          width: 100%;
                          display: block;
                          text-align: center;
                      }
      
                      .invoice-box table tr.information table td {
                          width: 100%;
                          display: block;
                          text-align: center;
                      }
                  }
              </style>
          </head>
      
          <body>
              <div class="invoice-boxx">
                  <h1 align="center">Esprego Coffee</h1>
                  <div class="invoice-box">
                      <table cellpadding="0" cellspacing="0">
                          <tr class="top">
                              <td colspan="2">
                              </td>
                          </tr>
                          <tr class="information">
                              <td>
                          <tr>
                              <td> <br> <br> <br> </td>
                              <td> <strong>Billed To:</strong><br> ${username}<br> <br> </td>
                          </tr>
                          </td>
                          </tr>
                          <table>
                              <tr class="heading">
                                  <td> Payment Method </td>
                                  <td> Card </td>
                              </tr>
                              <tr class="total">
                                  <td>Total</td>
                                  <td>${subtotal}</td>
                              </tr>
                          </table>
                          <p align="center"><strong>Thank You For Choosing Us</strong></p>
                  </div>
                  </hr>
                  <div>
                      </hr>
                  </div>
                  <div class="invoice-box">
                      <h1 align="center">Esprego Coffee</h1>
                      <p align="center">p#202, Gulberg-A<br>Faisalabad<br> Phone: +92090980076<br> Email:
                          esprego.coffee@gmail.com<br> Website:<a
                              href="www.espregocoffee.com">www.muskaandentalcare.webs.com</a><br></p>
                      <div align="center"> <a href="#"> <img
                                  src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png"
                                  align="middle" style="width:10%; max-width:50px;"> </a> <a href="#"> <img
                                  src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/google_circle_color-128.png"
                                  align="middle" style="width:10%; max-width:50px;"> </a> </div>
                      <div align="center"> <a href=" www.muskaandentalcare.webs.com"> &copy All Rights Reserved.</a> </div>
          </body>
      
          </html>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
      res.redirect('/userdash')
      console.log('error in sending email try again later')
      } else {
        console.log("Email sent: " + info.response);

    var query = `select * from cart where username='${username}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      else {
        var insert = `insert into orderdetails(username,cartid,date,subtotal,orderstatus) values ('${username}','${cartid}','${dates}','${subtotal}','ordered')`;
        connection.query(insert, (err) => {
          if (err) throw err;
          var select = `select id from orderdetails where username='${username}' and cartid='${cartid}'`;
          connection.query(select, (err, row) => {
            if (err) throw err;
            result.forEach((element) => {
              var del = `delete from cart where id='${element.id}'`;
              connection.query(del, (err) => {
                if (err) throw err;
                else {
                  var insertorder = `insert into eachorderdetails(username,prodid,prodname,prodcount,total,address,state,zip,city,orderid,date,subtotal,orderstatus,cardno,carddate,cvv) values ('${username}','${element.prodid}','${element.prodname}','${element.count}','${element.total}','${address}','${state}','${zip}','${city}','${row[0].id}','${dates}','${subtotal}','ordered','${cardno}','${carddate}','${cvv}')`;
                  connection.query(insertorder, (err) => {
                    if (err) throw err;
                    var payment = `insert into payment(username,orderid,subtotal,cardno,cvv,status) values ('${username}','${row[0].id}','${subtotal}','${cardno}','${cvv}','Successfull')`;
                    connection.query(payment, (err) => {
                      if (err) throw err;
                      console.log("done");
                    });
                  });
                }
              });
            });
          });
        });
        res.redirect("/account");
      }
    });
    }
    });
})
};

exports.orderdetail = (req, res) => {
  if (req.session.role == "user") {
    var id = req.params.id;
    var username = req.session.username;
    var query = `select * from eachorderdetails where orderid='${id}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/order_user_detail", {
        data: result,
        name: req.session.username,
        subtotal: result[0].subtotal,
        orderstatus: result[0].orderstatus,
      });
    });
  } else {
    res.redirect("/account");
  }
};

exports.adminorderdetail = (req, res) => {
  if (req.session.role == "admin") {
    var id = req.params.id;
    var username = req.session.username;
    var query = `select * from eachorderdetails where orderid='${id}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/admin_order_detail", {
        data: result,
        username: result[0].username,
        subtotal: result[0].subtotal,
        ordertableid: result[0].orderid,
        orderstatus: result[0].orderstatus,
      });
    });
  } else {
    res.redirect("/account");
  }
};

exports.changeorderstatus = (req, res) => {
  if (req.session.role == "admin") {
    var value;
    var orderidmain = req.params.orderid;
    console.log(orderidmain);
    var get = `select * from orderdetails where id='${orderidmain}'`;
    connection.query(get, (err, row) => {
      if (err) throw err;
      else {
        if (row[0].orderstatus == "ordered") {
          value = "shipped";
          var query = `update orderdetails set orderstatus='${value}' where id='${orderidmain}'`;
          connection.query(query, (err, result1) => {
            if (err) throw err;
            else {
              var query = `update eachorderdetails set orderstatus='${value}' where orderid='${orderidmain}'`;
              connection.query(query, (err) => {
                if (err) throw err;
                else {
                  res.redirect(`/adminorderdetails/${orderidmain}`);
                }
              });
            }
          });
        } else if (row[0].orderstatus == "shipped") {
          value = "ontheway";
          var query = `update orderdetails set orderstatus='${value}' where id='${orderidmain}'`;
          connection.query(query, (err, result1) => {
            if (err) throw err;
            else {
              var query = `update eachorderdetails set orderstatus='${value}' where orderid='${orderidmain}'`;
              connection.query(query, (err) => {
                if (err) throw err;
                else {
                  res.redirect(`/adminorderdetails/${orderidmain}`);
                }
              });
            }
          });
        } else if (row[0].orderstatus == "ontheway") {
          value = "delivered";
          var query = `update orderdetails set orderstatus='${value}' where id='${orderidmain}'`;
          connection.query(query, (err, result1) => {
            if (err) throw err;
            else {
              var query = `update eachorderdetails set orderstatus='${value}' where orderid='${orderidmain}'`;
              connection.query(query, (err) => {
                if (err) throw err;
                else {
                  res.redirect(`/adminorderdetails/${orderidmain}`);
                }
              });
            }
          });
        } else if (row[0].orderstatus == "delivered") {
          var insertearning = `insert into earndetails(username,date,subtotal,orderid) values ('${row[0].username}','${row[0].date}','${row[0].subtotal}','${orderidmain}')`;
          connection.query(insertearning, (err) => {
            if (err) throw err;
            else {
              var getdetails = `select * from eachorderdetails where orderid='${orderidmain}'`;
              connection.query(getdetails, (err, rowg) => {
                if (err) throw err;
                else {
                  rowg.forEach((element) => {
                    var getearndetail = `select * from earndetails where orderid='${orderidmain}'`;
                    connection.query(getearndetail, (err, rowd) => {
                      if (err) throw err;
                      else {
                        var inserteachearndetails = `insert into eachearndetails(prodid,username,prodcount,total,prodname,earnid,subtotal,date,orderid) values('${element.prodid}','${element.username}','${element.prodcount}','${element.total}','${element.prodname}','${rowd[0].id}','${element.subtotal}','${element.date}','${element.orderid}')`;
                        connection.query(inserteachearndetails, (err) => {
                          if (err) throw err;
                          console.log("done");
                        });
                        var getimg=`select prodimg from productdetails where prodid='${element.prodid}'`;
                        connection.query(getimg,(err,resu)=>{
                          if(err) throw err
                          var insertpastorder = `insert into pastorder(prodid,username,prodname,imgpath) values('${element.prodid}','${element.username}','${element.prodname}','${resu[0].prodimg}')`;
                          connection.query(insertpastorder, (err) => {
                            if (err) throw err;
                            console.log("done");
                          });
                        })
                      
                      }
                    });
                  });
                }
              });
              var getdetail = `select * from earndetails where orderid='${orderidmain}'`;
              connection.query(getdetail, (err, rowd) => {
                if (err) throw err;
                var del = `delete from orderdetails where id='${rowd[0].orderid}'`;
                connection.query(del, (err) => {
                  if (err) throw err;
                  else {
                    res.redirect("/account");
                  }
                });
              });
            }
          });
        }
      }
    });
  } else {
    res.redirect("/account");
  }
};

exports.eachdetails = (req, res) => {
  if (req.session.role == "admin") {
    var id = req.params.id;
    var query = `select * from eachearndetails where earnid='${id}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      res.render("page/eachearn_details", { data: result });
    });
  } else {
    res.redirect("/account");
  }
};





exports.pastorder = (req, res) => {
  if (req.session.role == "user" && req.session.username) {
    var username = req.session.username;
    var query = `select * from pastorder where username='${username}'`;
    connection.query(query, (err, result) => {
      if (err) throw err; 
      else{
      result.forEach(element => {
        var getprodcount=`select prodinstock from productdetails where prodid='${element.prodid}'`;
        connection.query(getprodcount,(err,row)=>{
          if(err) throw err
          else{
            var update=`update pastorder set prodcount='${row[0].prodinstock}' where id='${element.id}'`;
            connection.query(update,(err)=>{
              if(err) throw err
            })
          }
        })
      });
    }
                var query = `select * from pastorder where username='${username}'`;
                connection.query(query,(err,val)=>{
                  if(err) throw err
                  else{
                    res.render("page/pastorder", { data: val });
                  }
                })
        //       }
        //     })
        //   }
        // })
      // });
  
    });
  } else {
    res.redirect("/account");
  }
};

exports.pastorderaddtocart = (req, res) => {
  var username = req.session.username;
  if (username) {
    var prodid = req.body.prodid;
    var count = 1;
    var checkalreadyexsist = `select * from cart where username='${username}' and prodid='${prodid}'`;
    connection.query(checkalreadyexsist, (err, result) => {
      if (err) throw err;
      else {
        if (result.length > 0) {
          console.log("product already exsists in the cart");
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
    res.redirect("/account");
  }
};



exports.refund = (req, res) => {
  if (req.session.role == "admin") {
    var id = req.params.id;
    var query = `select * from eachearndetails where earnid='${id}'`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      var update=`update payment set status='refunded' where orderid='${result[0].orderid}'`;
      connection.query(update,(err,row)=>{
        if(err) throw err
        else{
          var del=`delete from earndetails where id='${id}'`;
          connection.query(del,(err)=>{
            if(err) throw err
            else{
              res.redirect('/dash');
            }
          })
        }
      })
    });
  } else {
    res.redirect("/account");
  }
};

exports.delpay = (req, res) => {
  if (req.session.role == "user") {
    var id = req.params.id;
   var query=`Delete from payment where id='${id}'`;
   connection.query(query,(err)=>{
    if(err) throw err;
    res.redirect('/account')
   })
  } else {
    res.redirect("/account");
  }
};


exports.showallpay = (req, res) => {
  if (req.session.role == "user") {
  
   var query='select * from payment';
   connection.query(query,(err,row)=>{
    if(err) throw err
    else{
      res.render('page/showall_pay',{data:row})
    }
   })
  } else {
    res.redirect("/account");
  }
};

exports.showallorder = (req, res) => {
  if (req.session.role == "user") {
  
   var query='select * from orderdetails';
   connection.query(query,(err,row)=>{
    if(err) throw err
    else{
      res.render('page/showall_userorder',{data:row})
    }
   })
  } else {
    res.redirect("/account");
  }
};



exports.cancelorder = (req, res) => {
  if (req.session.role == "user") {
    var id=req.params.id;
  var getorder=`select * from eachorderdetails where orderid='${id}'`;
  connection.query(getorder,(err,row)=>{
  if(err) throw err
  row.forEach(element => {
    var getprod=`select * from productdetails where prodid='${element.prodid}'`;
    connection.query(getprod,(err,rows)=>{
      if(err) throw err
      else{
        var prodinstock=(rows[0].prodinstock)+(element.prodcount);
        var update=`update productdetails set prodinstock='${prodinstock}'`;
        connection.query(update,(err)=>{
          if(err) throw err
        })
      }
    })
  });
  var del=`delete from orderdetails where id='${id}'`;
  connection.query(del,(err)=>{
    if(err) throw err
    res.redirect('/account');
  })
  })
  } else {
    res.redirect("/account");
  }
};

exports.justcheck = (req, res) => { 
  it=1; 
    const dataCountQuery = "SELECT COUNT(*) FROM productdetails";
    connection.query(dataCountQuery, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 6;
        let startLimit = (pageNo - 1) * dataPerPages;
        if(startLimit<0){
          startLimit==1;
        }
        let totalPages = Math.ceil(dataCount / dataPerPages);

        const Query = `SELECT * FROM productdetails LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
            if (err) throw err;
            res.render("page/temp_prod", {
                data: result,
                pages: totalPages,
                CurrentPage: pageNo,
                lastPage: totalPages,
                it
            });
        })
    })
};


exports.getmenu= (req, res) => { 
 var query=`select * from productdetails where catg='menu'`;
 connection.query(query,(err,row)=>{
  if(err) throw err
  if(req.session.username){
    res.render('page/menu',{data:row,username:req.session.username});
  }
  res.render('page/menu',{data:row,username:1});
 })  
};



exports.getwishlist= (req,res)=>{
  if (req.session.role == "user" && req.session.username) {
    var username = req.session.username;
     var get=`select * from wishlist where username='${username}'`;
     connection.query(get,(err,row)=>{
      if(row.length>0){
      row.forEach(element => {
        var get1=`select prodinstock from productdetails where prodid='${element.prodid}'`;
        connection.query(get1,(err,row1)=>{
      if(err) throw err
      var update=`update wishlist set prodcount='${row1[0].prodinstock}' where prodid='${element.prodid}'`
      connection.query(update,(err)=>{
        if(err) throw err
      });
     })
    })
  }
  else{
    console.log('wishlist is empty');
    res.render('page/wishlist',{data:0,message:req.flash('message')});
  }
  })
  var getw=`select * from wishlist where username='${username}'`;
 connection.query(getw,(err,rowd)=>{
   if(err) throw err
   else{
    res.render('page/wishlist',{data:rowd,message:req.flash('message')})
   }
  })
}
else{
  req.flash('message','Login or Signup First')
  res.redirect('/account')
}
}


exports.addtowishlist=(req,res)=>{
  if (req.session.role == "user" && req.session.username) {
    var username = req.session.username;
    var prodid = req.body.prodid;
    var check=`select * from wishlist where prodid='${prodid}' and username='${username}'`;
    connection.query(check,(err,row)=>{
      if(err) throw err
      else{
        if(row.length>0){
          console.log('already in wishlist');
          req.flash('message','Already in wishlist')
          res.redirect('/getwishlist');
        }
        else{
          var get=`select * from productdetails where prodid='${prodid}'`;
          connection.query(get,(err,rows)=>{
            if(err) throw err
            else{
              var insert=`insert into wishlist(username,prodimg,prodcount,prodname,prodid) values ('${username}','${rows[0].prodimg}','${rows[0].prodinstock}','${rows[0].prodname}','${prodid}')`;
              connection.query(insert,(err)=>{
                if(err) throw err
                else{
                  req.flash('message','Added to wishlist')
                  res.redirect('/getwishlist');
                }
              })
            }
          })
        }
      }
    })
  } else {
    req.flash('message','Login or Signup First')
    res.redirect("/account");
  }
}
exports.deletewishlist= (req,res)=>{
  if (req.session.role == "user" && req.session.username) {
    // var username = req.session.username;
        var id=req.params.id;
    var del=`delete from wishlist where id='${id}'`;
    connection.query(del,(err)=>{
      if(err) throw err
      else{
        req.flash('message','wishlist item delted successfully')
        res.redirect('/getwishlist')
      }
    })
    }
else{
  req.flash('message','Login or Signup First')
  res.redirect('/account')
}
}

exports.addfaq= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
    // var username = req.session.username;
    res.render('page/addfaq');
  }
else{
  res.redirect('/account')
}
}
exports.addfaqpost= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
   var qfaq=req.body.qfaq;
   var afaq=req.body.afaq;
   var insert=`insert into faq(q,a) values('${qfaq}','${afaq}')`;
   connection.query(insert,(err)=>{
    if(err) throw err;
    else{
      console.log('faq insertion successfull');
      req.flash('message','Faq Inserted Successfully')
      res.redirect('/allfaq');
    }
   })
  }
else{
  res.redirect('/account')
}
}
exports.getallfaq= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
   var get=`select * from faq`;
   connection.query(get,(err,row)=>{
    res.render('page/allfaq',{data:row,message:req.flash('message')});
   })
  }
else{
  res.redirect('/account')
}
}

exports.deletefaq= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
    var id=req.params.id;
   var get=`delete from faq where id='${id}'`;
   connection.query(get,(err)=>{
    req.flash('message','Faq Inserted Successfully')
    res.redirect('/allfaq')
   })
  }
else{
  res.redirect('/account')
}
}

exports.getallscrap= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
var get=`select * from product`;
connection.query(get,(err,row)=>{
  if(err) throw err
  else{
    res.render('page/showallscrap',{data:row})
  }
})
  }
else{
  res.redirect('/account')
}
}



exports.getallrepos= (req,res)=>{
  if (req.session.role == "admin" && req.session.username) {
var get=`select * from productdetails`;
connection.query(get,(err,row)=>{
  if(err) throw err
  var get=`select * from teamdetails`;
  connection.query(get,(err,row1)=>{
    var get=`select * from earndetails`; 
    connection.query(get,(err,row2)=>{
res.render('page/reportall',{data:row,data1:row2,data2:row1,message:req.flash('message')}); 
    })
  })
})
  }
else{
  res.redirect('/account')
}
}