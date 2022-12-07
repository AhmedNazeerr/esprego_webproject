const mysql=require('mysql');
const dotenv=require('dotenv').config();
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
   
const flash=require('connect-flash')
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
        req.flash('message','Member Added Successfully')
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
        res.render("page/adminteam", { action: "list", data: row ,message:req.flash('message')});
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
          req.flash('message','Member updated Successfully')
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
          req.flash('message','Member deleted Successfully')
          res.redirect("/admin/team");
        } else console.log(err);
      });
    } else {
      res.redirect("/home");
    }
  };
  
  
  