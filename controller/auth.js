const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
var valid = require("validator");
const path=require('path')

exports.login = (req, res) => {
    var pname = req.body.forloginname;
    var ppass = req.body.forloginpassword;
    var addingdataquery = `SELECT * FROM account WHERE username='${pname}'`;
    connection.query(addingdataquery, (err, row) => {
      if (err) throw err;
      if (row.length && bcrypt.compareSync(ppass, row[0].password)) {
        // const mailOptions = {
        //   from: "esprego.coffe@gmail.com",
        //   to: row[0].email,
        //   subject: "Verification",
        //   text: `Verify your credentials code : ${row[0].otp}`,
        // };
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
            res.render("page/verify_login", {
              data: row[0].otp,
              uname: row[0].username,
              urole: row[0].role,
            });
        //   }
        // });
      } else {
        console.log("data not present");
        res.redirect("/account");
      }
    });
  };



  exports.changepassword =async (req, res) => {
    var num4=generateCode();
    var pppname = req.body.pchangename;
    var pppass=await bcrypt.hash(req.body.pchangepass, 10);
    var addingdataquery = `SELECT * FROM account WHERE username='${pppname}'`;
    connection.query(addingdataquery, (err, row) => {
      if (err) throw err;
      if (row.length) {
        const mailOptions = {
            from: "esprego.coffe@gmail.com",
            to: row[0].email,
            subject: "Verification",
            text: `Verify your credentials code : ${num4}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);

              res.render('page/verify_changep',{data:pppass,data1:num4,data2:pppname})
            }
            })

        }
     else {
        console.log("data not present");
        res.redirect("/account_changepassword");
      }
     })
};
   
exports.getverifyloginchangepassword =(req, res) => {
    var code_10 = req.body.code_verify;
    var code_30 = req.body.otp;
    var code_40 = req.body.forchangep;
    if (code_10 == code_30) {
     console.log(req.body.new_password);
     var querys = `update account set password='${req.body.new_password}' where username='${code_40}'`;
        connection.query(querys, (err) => {
            if (!err) {
                console.log("update successfully");
              res.redirect("/account");
            }
            else{
console.log('error in update occur')
            }
          });
        }

     else {
      console.log("invalid verification code");
      res.render("page/verify_changep", {
        data: req.body.new_password,
        data1: code_30,
        data2:req.body.forchangep
      });
    }
  };



  
  exports.getverifylogin = (req, res) => {
    var code_1 = req.body.code_1;
    var code_2 = req.body.code_2;
    // if (code_1 == code_2) {
      req.session.username = req.body.code_3;
      req.session.role = req.body.code_4;
      // var num4 = generateCode();
      if (req.session.role == "admin") {
        // var query = "update account set otp=? where username=?";
        // var data = [num4, req.body.code_3];
        // connection.query(query, data, (err) => {
        //   if (!err) {
            res.redirect("/admin/team");
            console.log(req.session);
        //   } else {
        //     console.log("error in update getverify_login");
        //   }
        // });
      } else {
        // var query = "update account set otp=? where username=?";
        // var data = [num4, req.body.code_3];
        // connection.query(query, data, (err) => {
        //   if (!err) {
        //     console.log(req.session);
            res.redirect("/user_account");
        //   } else {
        //     console.log("error in update getverify_login");
        //   }
        // });
      }
  //   } else {
  //     console.log("invalid verification code");
  //     res.render("page/verify_login", {
  //       data: req.body.code_2,
  //       uname: req.body.code_3,
  //       urole: req.body.code_4,
  //     });
  //   }
  // };
    }
  
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
        query=`select * from account where username='${req.session.username}'`
        connection.query(query,(err,result)=>{
          if(err) throw err
          else{
            res.redirect("/userdash");
          }
        })
        
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

 