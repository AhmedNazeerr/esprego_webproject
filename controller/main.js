const connection = require("../config/database");
// const transporter = require("../config/mailer");
// const bcrypt = require("bcrypt");
// const pdf = require("html-pdf");
// const fs = require("fs");
// var valid = require("validator");
// const path=require('path')

//for home page
exports.servehome = (req, res) => {
  res.render("../views/page/home");
};
// for contact us page
exports.servecontactus = (req, res) => {
  res.render("../views/page/contact");
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


exports.getdash = (req, res) => {
  if (req.session.role == "admin") {
   res.render('page/dash')
  } else {
    res.redirect("/home");
  }
};
