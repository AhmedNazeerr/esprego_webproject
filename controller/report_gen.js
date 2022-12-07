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
const path=require('path');
const e = require('connect-flash');
const options = { format: "A4" };
exports.generatepdfprod = (req, res) => {
  if(req.session.role=="admin"){

  var Query = `SELECT * FROM productdetails`;
  connection.query(Query,(err,result)=>{
      if (err) throw err;
      res.render(
          "page/prod_rep",
          {
            data:result
          },
          function (err,html) {
              pdf
                  .create(html, options)
                  .toFile("PDF/pdetails.pdf", function (err) {
                      if (err){
                        req.flash('message','uenable to generate pdf')
                         res.redirect('/genreports');
                      }
                      else {
                          var all = fs.readFileSync("PDF/pdetails.pdf");
                          // res.header("content-type", "application/pdf");
                          // res.send(allMoviesPdf);
                          var mailOpptions = {
                            from: 'esprego.coffee@gmail.com',
                                to: "esprego.coffee@gmail.com",
                                subject: "Report",
                                html: `<h1>Report</h1>
                                       <p>This is Product Report!</p>`,
                                attachments: [
                                  {
                                    filename: 'pdetails.pdf',
                                    path: path.join(__dirname, "../PDF/pdetails.pdf")
                                  }]
                          };
                          transporter.sendMail(mailOpptions, function (error, info) {
                            if (error) {
                              console.log(error);
                              req.flash('message','ERROR in sending mail,try again later')
                              res.redirect('/genreports')
                            } else {
                              console.log("Email sent: " + info.response);
                              res.redirect('/genreports')
                            }
                          });
                          
                      }
                  });
          }
      );
  })
}
else{
res.redirect('/account')
}
}
exports.generatepdfteam = (req, res) => {
if(req.session.role=="admin"){
  var Query = `SELECT * FROM teamdetails`;
  connection.query(Query,(err,result)=>{
      if (err) throw err;
      res.render(
          "page/team_rep",
          {
            data2:result
          },
          function (err,html) {
              pdf
                  .create(html, options)
                  .toFile("PDF/tdetails.pdf", function (err) {
                      if (err){
                        req.flash('message','uenable to generate pdf')
                        res.redirect('/genreports');
                      }
                      else {
                          var all = fs.readFileSync("PDF/tdetails.pdf");
                          var mailOpptions = {
                            from: 'esprego.coffee@gmail.com',
                                to: "esprego.coffee@gmail.com",
                                subject: "Report",
                                html: `<h1>Report</h1>
                                       <p>This is Team Report!</p>`,
                                attachments: [
                                  {
                                    filename: 'pdetails.pdf',
                                    path: path.join(__dirname, "../PDF/tdetails.pdf")
                                  }]
                          };
                          transporter.sendMail(mailOpptions, function (error, info) {
                            if (error) {
                              console.log(error);
                              req.flash('message','ERROR in sending mail,try again later')
                              res.redirect('/genreports')
                            } else {
                              console.log("Email sent: " + info.response);
                              res.redirect('/genreports')
                            }
                          });
                          
                      }
                  });
          }
      );
  })
}else{
res.redirect('/account')
}
}

exports.generatepdfearn = (req, res) => {
if(req.session.role=="admin"){
  var Query = `SELECT * FROM earndetails`;
  connection.query(Query,(err,result)=>{
      if (err) throw err;
      res.render(
          "page/earn_rep",
          {
            data1:result
          },
          function (err,html) {
              pdf
                  .create(html, options)
                  .toFile("PDF/edetails.pdf", function (err) {
                      if (err) {
                        req.flash('message','uenable to generate pdf')
                        res.redirect('/genreports');
                      }
                      else {
                          var all = fs.readFileSync("PDF/edetails.pdf");
                          var mailOpptions = {
                            from: 'esprego.coffee@gmail.com',
                                to: "esprego.coffee@gmail.com",
                                subject: "Report",
                                html: `<h1>Report</h1>
                                       <p>This is Earn Report!</p>`,
                                attachments: [
                                  {
                                    filename: 'edetails.pdf',
                                    path: path.join(__dirname, "../PDF/edetails.pdf")
                                  }]
                          };
                          transporter.sendMail(mailOpptions, function (error, info) {
                            if (error) {
                              console.log(error);
                              req.flash('message','ERROR in sending mail,try again later')
                              res.redirect('/genreports')
                            } else {
                              console.log("Email sent: " + info.response);
                              res.redirect('/genreports')
                            }
                          });
                          
                      }
                  });
          }
      );
  })
}else{
  res.redirect('/account')
}
}

