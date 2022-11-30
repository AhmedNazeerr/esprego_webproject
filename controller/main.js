const mysql = require('mysql'); 
const bodyparser=require('body-parser');
//data base connection
var connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'webproject'
});
//connection checker
connection.connect(function (err){
    if (err) throw err;
    console.log('connected');
  })
exports.servehome = (req, res) => {
      res.render("../views/page/home")
  };
  exports.servecontactus = (req, res) => {
    res.render("../views/page/contact")
};
exports.serveaboutus = (req, res) => {
    res.render("../views/page/about")
};

//getting all customers
exports.getcustomer = (req, res) => {
    var query="select * from customer";
    connection.query(query,(err,row,fields)=>{
      if (err) throw err;
      res.render('page/index',{title:'Record', action:'list',data:row});
    })
};

//displaying teams page
exports.getteam = (req, res)=>{
    var query="select * from teamdetails";
    connection.query(query,(err,row,fields)=>{
      if (err) throw err;
      res.render('page/ourteam',{action:'list',data:row});
    })
    }

//displaying form for adding new team member
exports.teamadd= (req, res) => {
      res.render('page/addteam');
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
    var fname=req.body.firstname;
      var lname=req.body.lastname;
      var email1=req.body.email;
      var cnic1=req.body.cnic;
      var pos1=req.body.pos;
      var img=req.file.originalname;
        var addingdataquery="INSERT INTO teamdetails(workerfname,wrokerlname,workerpos,email,cnic,imgpath) VALUES ('"+fname+"','"+lname+"','"+pos1+"','"+email1+"','"+cnic1+"','"+img+"')";
        connection.query(addingdataquery,(err)=>{
          if (err) throw err;
          res.redirect("/admin/team");
        })
};
exports.getteamadmin = (req, res)=>{
  var query="select * from teamdetails";
  connection.query(query,(err,row,fields)=>{
    if (err) throw err;
    res.render('page/adminteam',{action:'list',data:row});
  })
  }
//   //displaying form to update  team member
// exports.teamadd= (req, res) => {
//   res.render('page/updateteam');
// };

//showing team member data in form
exports.updateteam = (req, res) => {
  var id=req.query.id;
  var tempquery="SELECT * FROM `teamdetails` WHERE `workerid` = ?";
  connection.query(tempquery,[id],(err, row) => {
      if (!err) {
        res.render("page/updateteam",{data:row})
      } else console.log(err);
    }
  );
};

//updating team member data in form
exports.updateteampost=(req,res)=>{
  if(req.file){
    var fname=req.body.firstname;
var lname=req.body.lastname;
var email=req.body.email;
var cnic=req.body.cnic;
var pos=req.body.pos;
var img=req.file.originalname;
var idd=req.body.updateid;
var query="update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=?,imgpath=? where workerid=?";
var data=[fname,lname,email,cnic,pos,img,idd];
  }
  else{
var fname=req.body.firstname;
var lname=req.body.lastname;
var email=req.body.email;
var cnic=req.body.cnic;
var pos=req.body.pos;
var idd=req.body.updateid;
var query="update teamdetails set workerfname=?,wrokerlname=?,email=?,cnic=?,workerpos=? where workerid=?";
var data=[fname,lname,email,cnic,pos,idd];
  }

connection.query(query,data,(err)=>{
  if(!err){
    res.redirect("/admin/team");
  }
  console.log("error in update");
})

};


//del team member data
exports.delteam = (req, res) => {
  var tempquery="DELETE FROM `teamdetails` WHERE `workerid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.redirect("/admin/team");
      } else console.log(err);
    }
  );
};

exports.getproductadmin = (req, res)=>{
  var query="select * from productdetails";
  connection.query(query,(err,row,fields)=>{
    if (err) throw err;
    res.render('page/adminproduct',{action:'list',data:row});
  })
  }

  //del product data
exports.delproduct = (req, res) => {
  var tempquery="DELETE FROM `productdetails` WHERE `prodid` = " + req.params.id;
  connection.query(tempquery,(err, row, fields) => {
      if (!err) {
          res.redirect("/admin/product");
      } else console.log(err);
    }
  );
};

//displaying form for adding new product
exports.productadd= (req, res) => {
  res.render('page/addproduct');
};

//adding new product
exports.addproduct= (req, res) => {
  var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var img=req.file.originalname;
      var addingdataquery="INSERT INTO productdetails(prodname,prodbrandname,prodinstock,proddesc,prodimg) VALUES ('"+pname+"','"+bname+"','"+quan+"','"+desc+"','"+img+"')";
      connection.query(addingdataquery,(err)=>{
        if (err) throw err;
        res.redirect("/admin/product");
      })
};


//showing product data in form
exports.updateproduct = (req, res) => {
  var id=req.query.id;
  var tempquery="SELECT * FROM `productdetails` WHERE `prodid` = ?";
  connection.query(tempquery,[id],(err, row) => {
      if (!err) {
        res.render("page/updateproduct",{data:row})
      } else console.log(err);
    }
  );
};

//updating product data in form
exports.updateproductpost=(req,res)=>{
  if(req.file){
    var id=req.body.id;
    var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var img=req.file.originalname;
var query="update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=?,prodimg=? where prodid=?";
var data=[pname,bname,quan,desc,img,id];
  }
  else{
    var id=req.body.id;
    var pname=req.body.prodname;
    var bname=req.body.brandname;
    var quan=req.body.quantity;
    var desc=req.body.desc;
    var query="update productdetails set prodname=?,prodbrandname=?,prodinstock=?,proddesc=? where prodid=?";
    var data=[pname,bname,quan,desc,id];
  }

connection.query(query,data,(err)=>{
  if(!err){
    res.redirect("/admin/product");
  }
  else{
  console.log("error in update");
  }
})

};
