const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
// const pdf = require("html-pdf");
// const fs = require("fs");
var valid = require("validator");
const e = require("connect-flash");
// const { hash } = require("bcrypt");
// const path=require('path')

//for home page
exports.servehome = (req, res) => {
  res.render("../views/page/home");
};


exports.contactadmin = (req, res) => {
  if (req.session.role == "admin") {
  var query=`Select * from contactus`;
  connection.query(query,(err,result)=>{
    if(err) throw err;
    else{
      res.render("../views/page/admin_contact",{data:result});
    }
  })
}
else{
  res.redirect('/home')
} 
};



// for contact form
exports.contactus = (req, res) => {
    var nname=req.body.contactname;
    var ename=req.body.contactemail;
    var mname=req.body.contactmessage;
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
            } else {
              console.log("Email sent: " + info.response);
              var querycontact=`insert into contactus(name,email,message) values ('${nname}','${ename}','${mname}')`;
              connection.query(querycontact,(err)=>{
                if(err) throw err;
                else{
                  console.log('response submitted successfully');
                  res.redirect('/home');
                }
              })
            }
          });
        }
        else{
          console.log('invalid email')
        }

};


exports.customer_admin=(req,res)=>{
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
}



exports.customer_admin_post=(req,res)=>{
  if (req.session.role == "admin") {
    var admin_useri=req.body.admin_userid;
    var admin_messag=req.body.admin_message;
    var admin_mail=req.body.admin_email;
    console.log(admin_mail,admin_messag,admin_useri);
          const mailOptions = {
            from: "esprego.coffe@gmail.com",
            to: admin_mail,
            subject: "Addressing Your Query",
            text: `${admin_messag}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              var query=`DELETE FROM contactus where id='${admin_useri}'`;
              connection.query(query,(err)=>{
                if(err) throw err;
                else{
                  console.log('data deleted sucessfully');
                  res.redirect('/contactadmin');
                }
              })
            }
          });
  } 
  else {
    res.redirect("/home");
  }
}


exports.updateloguser = (req, res) => {
  if (req.session.role == "user") {
         var query=`select * from account where username='${req.session.username}'`;
         connection.query(query,(err,result)=>{
          if (err) throw err
          else{
            res.render('page/detailupdate',{data:result});
          }
         })
  } else {
    res.redirect("/home");
  }
};

exports.userdash = (req, res) => {
  if (req.session.role == "user") {
   res.render('page/userdash',{data:req.session.username})
  } else {
    res.redirect("/home");
  }
};


 exports.updateuserpost = (req, res) => {
  if (req.session.role == "user") {
    if (req.file) {
      // var username = req.body.firstname;
      var email = req.body.email;
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var addr = req.body.address;
      var img = req.file.originalname;;
      var idd = req.body.id;
      var query =
        "update account set email=?,imgpath=?,firstname=?,lastname=?,address=? where username=?";
      var data = [
        email,
        img,
        fname,
        lname,
        addr,
        idd,
      ];
    } else {
      var email = req.body.email;
      var fname = req.body.firstname;
      var lname = req.body.lastname;
      var addr = req.body.address;
      var idd = req.body.id;
        // var username = req.body.firstname;
        var query =
        "update account set email=?,firstname=?,lastname=?,address=? where username=?";
      var data = [
        email,
        fname,
        lname,
        addr,
        idd,
      ];
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
      var query=`select * from review where prodid='${req.params.id}'`;
      connection.query(query,(err,resu)=>{
        if(err) throw err
        else{
          var query2=`select * from comment where prodid='${req.params.id}'`;
          connection.query(query2,(err,results)=>{
            if(err) throw err
            else{
          if((req.session.role=="user")){
          res.render("page/productdetails", { data: row ,rev:resu,temp:1,user:req.session.username,comment:results});
          }
          else{
            res.render("page/productdetails", { data: row ,rev:resu,temp:0,user:null,comment:results});
          }
        }
        })
        }
      })
     
    } else console.log(err);
  });
};

exports.getaccpage = (req, res) => {
  if (req.session.role == "admin") {
    res.redirect("/admin/team/add");
  } else if(req.session.role=="user"){
    res.redirect("/userdash");
  }
  else{
    if (!req.session.username) {
      res.render("page/login");
    } else {
      res.redirect("/home");
    }
  }
}


exports.getdash = (req, res) => {
  if (req.session.role == "admin") {
   res.render('page/dash')
  } else {
    res.redirect("/home");
  }
};

exports.changeuserpass = (req, res) => {
     if(req.session.role=="user"){
        res.render('page/changeuserpass',{data:req.session.username})
     }
     else{
      res.redirect('/home')
     }
};
exports.changeuserpasspost = async(req, res) => {
  var pold = req.body.oldp;
  var pnew = req.body.newp;
  var hashedpassword = await bcrypt.hash(pnew, 10);
  var id = req.body.id;
  var query=`update account set password='${hashedpassword}' where username='${id}'`;
  var addingdataquery = `SELECT * FROM account WHERE username='${id}'`;
  connection.query(addingdataquery, (err, row) => {
    if (err) throw err;
    if (row.length &&  bcrypt.compareSync(pold, row[0].password)) {
        connection.query(query,(err)=>{
          if(err) throw err
          else{
            console.log('password updated successfully');
            res.redirect('/userdash');
          }
        })
        console.log('password match')
    } 
    else {
      console.log("Old Password is incorrect");
      res.render('page/changeuserpass',{data:id})
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
exports.addrevpost =(req, res) => {
  if(req.session.role=="user"){
 var review=req.body.rev;
 var username=req.body.username;
 var id=req.body.prodid;
 var star=req.body.star;
var query1=`Insert  into review(prodid,username,review,star) values ('${id}','${username}','${review}','${star}')`;
        connection.query(query1,(err)=>{
          if(err) throw err
          console.log('review added successfully')
          res.redirect(`/productdetail/${id}`);
        })
  }
  else{
   res.redirect('/product')
  }
 };

 exports.renderreply = (req, res) => {
  if (req.session.username) {
    var revid=req.params.id;
    var prodid=req.params.prodid;
    var username=req.params.username;
   res.render('page/reply',{revid:revid,prodid:prodid,username:username})
  } else {
    res.redirect("/account");
  }
};

exports.renderreplypost = (req, res) => {
  if (req.session.username) {
    var revid=req.body.revid;
    var prodid=req.body.prodid;
    var username=req.body.username;
    var reply=req.body.reply;
    var query=`insert into comment (username,prodid,reply,revid) values ('${username}','${prodid}','${reply}','${revid}')`;
    connection.query(query,(err)=>{
      if (err) throw err;
      else{
        res.redirect(`/productdetail/${prodid}`)
      }
    })
  } else {
    res.redirect(`/productdetail/${prodid}`);
  }
};











// modules for testing 
const findallcontacts=function (callback){
exports.contactadmin = (req, res) => {
  var query=`Select * from contactus`;
  connection.query(query,(err,result)=>{
    if(err) throw err;
    else{
      callback(result)
    }
  }) 
};
}



const fs = require("fs");
const puppeteer = require("puppeteer");


exports.scrapper = (req, res) => {
  if (req.session.role=="admin") {
    async function run () {
      var query2="Select * from product";
      connection.query(query2,(err,results)=>{
          if(err) throw err;
          else{
              if(results.length>0){
                  var query1="DELETE FROM product";
                  connection.query(query1,(err)=>{
                      if(err) throw err;
                      else{
                          console.log("old table data dropped");
                      }
                  })
              }
              else{
                  console.log("table already empty");
              }
          }
    
  })
    const browser = await puppeteer.launch({
      headless:false
    });
    const page = await browser.newPage();
    await page.goto("https://www.daraz.pk/catalog/?q=coffee&_keyori=ss&from=input&spm=a2a0e.home.search.go.35e34937YTDFfm");
    // Get products using $$eval
    const products = await page.$$eval("#root .inner--SODwy", (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".title--wFj93").innerText,
        price: e.querySelector(".price--NVB62 .currency--GVKjl").innerText
      }))
    );
  
  //   console.log(products);
  
  //   Save data to JSON file
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("File saved");
    });
  
  
  //read data from file
    fs.readFile("product.json", (err,result) => {
      if (err) throw err;
      var resulttemp=JSON.parse(result);
      resulttemp.forEach(element => {
          if(element.price==''){
              var price=350;
              var query=`insert into product(title,price) values ("${element.title}",'${price}')`;
              connection.query(query,(err)=>{
                  if(err) throw err;
                  else{
                      console.log('insertion successfull')
                  }
              })
          }
          else{
          var query=`insert into product(title,price) values ("${element.title}",'${element.price}')`;
          connection.query(query,(err)=>{
              if(err) throw err;
              else{
                  console.log('insertion successfull')
              }
          })
          }
      });     
  });
  
    await browser.close();
  }
  run();
  } else {
    res.redirect(`/home`);
  }
};





//  module.exports={findallcontacts};