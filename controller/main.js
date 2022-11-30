const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const pdf = require("html-pdf");
const fs = require("fs");
const { request } = require("http");
const e = require("connect-flash");
const session = require("express-session");
const nodemailer = require("nodemailer");
var valid = require("validator");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: "esprego.coffee@gmail.com",
    pass: "kaigtpekirlqpspm", // naturally, replace both with your real credentials or an application-specific password
  },
});
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
exports.servehome = (req, res) => {
  res.render("../views/page/home");
};
exports.servecontactus = (req, res) => {
  res.render("../views/page/contact");
};
exports.serveaboutus = (req, res) => {
  res.render("../views/page/about");
};

//getting all customers
exports.getcustomer = (req, res) => {
  var query = "select * from customer";
  connection.query(query, (err, row, fields) => {
    if (err) throw err;
    res.render("page/index", { title: "Record", action: "list", data: row });
  });
};

//displaying teams page
exports.getteam = (req, res) => {
  const resultsPerPage = 9;
  let sql = "SELECT * FROM teamdetails";
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
    sql = `SELECT * FROM teamdetails LIMIT ${startingLimit},${resultsPerPage}`;
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
      res.render("page/ourteam", {
        data: result,
        page,
        iterator,
        endingLink,
        numberOfPages,
      });
    });
  });
};

//displaying teams after search
exports.getsearchteam = (req, res) => {
  it = 0;
  var min = 0;
  var year = req.query.year;
  var sname = req.query.sname;
  var sql = `SELECT * FROM teamdetails where  workerfname LIKE '%${sname}%' and workerexperience BETWEEN '${min}' and '${year}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render("page/oursearchteam", { data: result, it });
    }
    it = 100;
    res.render("page/oursearchteam", { data: result, it });
  });
};

//displaying form for adding new team member
exports.teamadd = (req, res) => {
  if (req.session.role == "admin") {
    res.render("page/addteam");
  } else {
    res.redirect("/home");
  }
};

//adding new team member
exports.addteam = (req, res) => {
  // if (!req.file) {
  //     console.log("No file received");
  //     return res.send({
  //       success: false,
  //     });
  //   } else {
  //     console.log("file received");
  //   }
  if (req.session.role == "admin") {
    var fname = req.body.firstname;
    var lname = req.body.lastname;
    var email1 = req.body.email;
    var cnic1 = req.body.cnic;
    var pos1 = req.body.pos;
    var deg = req.body.deg;
    var phn = req.body.phn;
    var exp = req.body.exp;
    var level = req.body.level;
    var desc = req.body.desc;
    var fax = req.body.fax;
    var img = req.file.originalname;
    var addingdataquery =
      "INSERT INTO teamdetails(workerfname,wrokerlname,workerpos,email,cnic,imgpath,workerdegree,workerphone,workerexperience,workercareerlevel,workerdesc,workerfax) VALUES ('" +
      fname +
      "','" +
      lname +
      "','" +
      pos1 +
      "','" +
      email1 +
      "','" +
      cnic1 +
      "','" +
      img +
      "','" +
      deg +
      "','" +
      phn +
      "','" +
      exp +
      "','" +
      level +
      "','" +
      desc +
      "','" +
      fax +
      "')";
    connection.query(addingdataquery, (err) => {
      if (err) throw err;
      res.redirect("/admin/team");
    });
  } else {
    res.redirect("/home");
  }
};
exports.getteamadmin = (req, res) => {
  if (req.session.role == "admin") {
    var query = "select * from teamdetails";
    connection.query(query, (err, row, fields) => {
      if (err) throw err;
      res.render("page/adminteam", { action: "list", data: row });
    });
  } else {
    res.redirect("/home");
  }
};
//   //displaying form to update  team member
// exports.teamadd= (req, res) => {
//   res.render('page/updateteam');
// };

//showing team member data in form
exports.updateteam = (req, res) => {
  if (req.session.role == "admin") {
    var id = req.query.id;
    var tempquery = "SELECT * FROM `teamdetails` WHERE `workerid` = ?";
    connection.query(tempquery, [id], (err, row) => {
      if (!err) {
        res.render("page/updateteam", { data: row });
      } else console.log(err);
    });
  } else {
    res.redirect("/home");
  }
};

//updating team member data in form
exports.updateteampost = (req, res) => {
  if (req.session.role == "admin") {
    if (req.file) {
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var email = req.body.email;
      var cnic = req.body.cnic;
      var pos = req.body.pos;
      var img = req.file.originalname;
      var idd = req.body.updateid;
      var deg = req.body.deg;
      var phn = req.body.phn;
      var exp = req.body.exp;
      var level = req.body.level;
      var desc = req.body.desc;
      var fax = req.body.fax;
      var query =
        "update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=?,imgpath=?,workerdegree=?,workerphone=?,workerexperience=?,workercareerlevel=?,workerdesc=?,workerfax=? where workerid=?";
      var data = [
        fname,
        lname,
        email,
        cnic,
        pos,
        img,
        deg,
        phn,
        exp,
        level,
        desc,
        fax,
        idd,
      ];
    } else {
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var email = req.body.email;
      var cnic = req.body.cnic;
      var pos = req.body.pos;
      var idd = req.body.updateid;
      var deg = req.body.deg;
      var phn = req.body.phn;
      var exp = req.body.exp;
      var level = req.body.level;
      var desc = req.body.desc;
      var fax = req.body.fax;
      var query =
        "update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=?,workerdegree=?,workerphone=?,workerexperience=?,workercareerlevel=?,workerdesc=?,workerfax=? where workerid=?";
      var data = [
        fname,
        lname,
        email,
        cnic,
        pos,
        deg,
        phn,
        exp,
        level,
        desc,
        fax,
        idd,
      ];
    }

    connection.query(query, data, (err) => {
      if (!err) {
        res.redirect("/admin/team");
      }
      console.log("error in update");
    });
  } else {
    res.redirect("/home");
  }
};

//del team member data
exports.delteam = (req, res) => {
  if (req.session.role == "admin") {
    var tempquery =
      "DELETE FROM `teamdetails` WHERE `workerid` = " + req.params.id;
    connection.query(tempquery, (err, row, fields) => {
      if (!err) {
        res.redirect("/admin/team");
      } else console.log(err);
    });
  } else {
    res.redirect("/home");
  }
};

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
  it = 0;
  var min = req.query.min;
  var max = req.query.max;
  var pname = req.query.pname;
  console.log(min, max);
  var sql = `SELECT * FROM productdetails where  prodname LIKE '%${pname}%' and prodprice BETWEEN '${min}' and '${max}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.render("page/oursearchproduct", { data: result, it });
    }
    it = 100;
    res.render("page/oursearchproduct", { data: result, it });
  });
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
      res.render("page/productdetails", { data: row });
    } else console.log(err);
  });
};

exports.getaccpage = (req, res) => {
  if (req.session.role == "admin") {
    res.redirect("/admin/team/add");
  } else {
    if (!req.session.username) {
      res.render("page/login");
    } else {
      res.redirect("/user");
    }
  }
};

exports.login = (req, res) => {
  var pname = req.body.forloginname;
  var ppass = req.body.forloginpassword;
  var addingdataquery = `SELECT * FROM account WHERE username='${pname}'`;
  connection.query(addingdataquery, (err, row) => {
    if (err) throw err;
    if (row.length && bcrypt.compareSync(ppass, row[0].password)) {
      const mailOptions = {
        from: "esprego.coffe@gmail.com",
        to: row[0].email,
        subject: "Verification",
        text: `Verify your credentials code : ${row[0].otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.render("page/verify_login", {
            data: row[0].otp,
            uname: row[0].username,
            urole: row[0].role,
          });
        }
      });
    } else {
      console.log("data not present");
      res.redirect("/account");
    }
  });
};

exports.getverifylogin = (req, res) => {
  var code_1 = req.body.code_1;
  var code_2 = req.body.code_2;
  if (code_1 == code_2) {
    req.session.username = req.body.code_3;
    req.session.role = req.body.code_4;
    var num4 = generateCode();
    if (req.session.role == "admin") {
      var query = "update account set otp=? where username=?";
      var data = [num4, req.body.code_3];
      connection.query(query, data, (err) => {
        if (!err) {
          res.redirect("/admin/team");
          console.log(req.session);
        } else {
          console.log("error in update getverify_login");
        }
      });
    } else {
      var query = "update account set otp=? where username=?";
      var data = [num4, req.body.code_3];
      connection.query(query, data, (err) => {
        if (!err) {
          console.log(req.session);
          res.redirect("/user");
        } else {
          console.log("error in update getverify_login");
        }
      });
    }
  } else {
    console.log("invalid verification code");
    res.render("page/verify_login", {
      data: req.body.code_2,
      uname: req.body.code_3,
      urole: req.body.code_4,
    });
  }
};

function generateCode() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}
exports.register = async (req, res) => {
  var num = generateCode();
  var hashedpassword = await bcrypt.hash(req.body.passwordregister, 10);
  var registerusername = req.body.usernameregister;
  var registeremail = req.body.emailregister;
  var checkquery = `Select * from account where username='${registerusername}'`;
  connection.query(checkquery, (err, row) => {
    if (err) throw err;
    if (row.length > 0) {
      console.log("try different username");
      res.redirect("/account");
    } else {
      //email validation
      if (valid.isEmail(registeremail)) {
        var checkquery = `Select * from account where email='${registeremail}'`;
        connection.query(checkquery, (err, row) => {
          if (err) throw err;
          if (row.length > 0) {
            console.log("try different email");
            res.redirect("/account");
          } else {
            const mailOptions = {
              from: "esprego.coffe@gmail.com",
              to: registeremail,
              subject: "Verification",
              text: `Verify your email code : ${num}`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                res.render("page/verify", {
                  data: num,
                  val1: registerusername,
                  val2: registeremail,
                  val3: hashedpassword,
                });
              }
            });
          }
        });
      } else {
        console.log("entered email was invalid");
        res.redirect("/account");
      }
    }
  });
};

//when the user signup, he will be redirected to this page where verification code will be compared with the one which was sent via email,after successfull verification he/she will be redirected to sign in page
exports.getverify = (req, res) => {
  var code1 = req.body.code1;
  var code2 = req.body.code2;
  var username_fetch = req.body.code3;
  var email_fetch = req.body.code4;
  var password_fetch = req.body.code5;
  console.log(code1, code2, username_fetch, email_fetch, password_fetch);
  if (code1 == code2) {
    console.log("verification code was valid");
    var num2 = generateCode();
    var addingdata = `INSERT INTO account(username,password,email,otp,role) VALUES ('${username_fetch}','${password_fetch}','${email_fetch}','${num2}','user')`;
    connection.query(addingdata, (err) => {
      if (err) throw err;
      res.redirect("/account");
    });
  } else {
    console.log("invalid verification code");
    res.render("page/verify", {
      data: req.body.code2,
      val1: username_fetch,
      val2: email_fetch,
      val3: password_fetch,
    });
  }
};

// res.render("page/home")
// console.log(pname + "" +bname);

//for login page after successfull authentication
exports.loggedin = (req, res) => {
  if (req.session.role == "admin") {
    res.redirect("admin/team/add");
  } else {
    if (!req.session.username) {
      res.redirect("/account");
    } else {
      console.log(req.session);
      res.render("page/userloggedin", { data: req.session.username });
    }
  }
};

//for login page after successfull authentication
exports.signout = (req, res) => {
  if (req.session.role == "admin") {
    res.redirect("/admin/team/add");
  } else {
    if (!req.session.username) {
      res.redirect("/account");
    } else {
      console.log(
        "this session destroyed",
        req.session.username,
        " ",
        req.session.role
      );
      req.session.destroy();
      res.redirect("/account");
      console.log("successfully logged out");
    }
  }
};

exports.adminsignout = (req, res) => {
  if (!(req.session.role == "admin") || !req.session.username) {
    res.redirect("/account");
  } else {
    console.log(
      "this session destroyed",
      req.session.username,
      " ",
      req.session.role
    );
    req.session.destroy();
    res.redirect("/account");
    console.log("successfully logged out");
  }
};

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
