const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
const pdf = require("html-pdf");
const fs = require("fs");
const path=require('path')
const options = { format: "A4" };
exports.generatepdfprod = (req, res) => {

  var Query = `SELECT * FROM productdetails`;
  connection.query(Query,(err,result)=>{
      if (err) throw err;
      res.render(
          "page/report",
          {
            data:result
          },
          function (err,html) {
              pdf
                  .create(html, options)
                  .toFile("PDF/pdetails.pdf", function (err) {
                      if (err) return console.log(err);
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
                            } else {
                              console.log("Email sent: " + info.response);
                              res.redirect('/dash')
                            }
                          });
                          
                      }
                  });
          }
      );
  })
}
exports.generatepdfteam = (req, res) => {

  var Query = `SELECT * FROM teamdetails`;
  connection.query(Query,(err,result)=>{
      if (err) throw err;
      res.render(
          "page/report1",
          {
            data:result
          },
          function (err,html) {
              pdf
                  .create(html, options)
                  .toFile("PDF/tdetails.pdf", function (err) {
                      if (err) return console.log(err);
                      else {
                          var all = fs.readFileSync("PDF/tdetails.pdf");
                          // res.header("content-type", "application/pdf");
                          // res.send(allMoviesPdf);
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
                            } else {
                              console.log("Email sent: " + info.response);
                              res.redirect('/dash')
                            }
                          });
                          
                      }
                  });
          }
      );
  })
}

