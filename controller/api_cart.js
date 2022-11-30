const connection = require("../config/database");
const transporter = require("../config/mailer");
const bcrypt = require("bcrypt");
// const pdf = require("html-pdf");
// const fs = require("fs");
var valid = require("validator");
const e = require("connect-flash");
// const { hash } = require("bcrypt");
// const path=require('path')






exports.addtocart=(req,res)=>{
    var username=req.session.username;
    if((username)){
    var prodid=req.body.prodid;
    var count=req.body.count;
    var checkalreadyexsist=`select * from cart where username='${username}' and prodid='${prodid}'`;
    connection.query(checkalreadyexsist,(err,result)=>{
      if (err) throw err
      else{
        if(result.length>0){
          console.log('product already exsists in the cart');
          res.redirect(`/productdetail/${prodid}`)
        }
        else{
          var getproductdetail=`select * from productdetails where prodid='${prodid}'`;
          connection.query(getproductdetail,(err,row)=>{
            if(err) throw err
            else{
              var totalgen=(count*(row[0].prodprice));
              var insertintocart=`insert into cart(username,prodid,prodname,prodprice,prodimg,count,total) values('${username}','${prodid}','${row[0].prodname}','${row[0].prodprice}','${row[0].prodimg}','${count}','${totalgen}')`;
              connection.query(insertintocart,(err)=>{
                if (err) throw err;
                else{
                  console.log('product added to cart');
                  res.redirect(`/usercart`);
                }
              })
            }
          })
        }
      }
    })
  }
  else{
    console.log('login in first');
    res.redirect('/account')
  }
  }
  
exports.getusercart = (req, res) => {
    if(req.session.role=="user"){
      console.log(`${req.session.username}`)
      var query=`select * from cart where username='${req.session.username}'`;
      connection.query(query,(err,row)=>{
          if(err)throw err
          console.log(row)
          var getcartcount=`SELECT COUNT(*) AS namesCount FROM cart where username='${req.session.username}'`
          connection.query(getcartcount,(err,resultant)=>{
            if(err) throw err;
            else{
              if(resultant.length>0){
                var subtotal=`SELECT  total, SUM(total) AS Total FROM cart where username='${req.session.username}'`;
                connection.query(subtotal,(err,resu)=>{
                    if(err) throw err;
                    else{
                        if(resu.length>0){
                            res.render('page/usercart',{data:row,pageitem:resultant[0].namesCount,subtotals:resu[0].Total});
                        }
                        else{
                            console.log('total is zero')
                        }
                    }
                })
       
              }
              else{
                console.log('cart is empty')
              }
            }
          })
         
        })
    }
    else{
     res.redirect('/home')  
    }
  };
  
  exports.increasecount=(req,res)=>{
    if(req.session.role=="user"){
    var id=req.params.id;
    var usernam=req.session.username;
   var getoldcount=`select * from cart where username='${usernam}' and id='${id}'`;
    connection.query(getoldcount,(err,reso)=>{
      if(err) throw err
      else{
        if(reso.length>0){
          var oldval=reso[0].count;
          var newval=(oldval+1);
          var totalgen=(newval*(reso[0].prodprice));
          var query=`update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
          connection.query(query,(err)=>{
            if(err) throw err
            else{
              console.log('count incremented by 1')
              res.redirect('/usercart');
            }
          })
        }
        else{
          console.log('no count val')
        }
  
      }
    })
  }
    else{
      res.redirect('/home')
    }
  }
  exports.decreasecount=(req,res)=>{
    if(req.session.role=="user"){
      var id=req.params.id;
      var usernam=req.session.username;
     var getoldcount=`select * from cart where username='${usernam}' and id='${id}'`;
      connection.query(getoldcount,(err,reso)=>{
        if(err) throw err
        else{
          if(reso.length>0){
            var oldval=reso[0].count;
            var newval=(oldval-1);
            if(newval==0){
              newval=1;
              var totalgen=(newval*(reso[0].prodprice));
            var query=`update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
            connection.query(query,(err)=>{
              if(err) throw err
              else{
                console.log('count incremented by 1')
                res.redirect('/usercart');
              }
            })
            }
            else{
                var totalgen=(newval*(reso[0].prodprice));
            var query=`update cart set count='${newval}',total='${totalgen}' where id='${id}'`;
            connection.query(query,(err)=>{
              if(err) throw err
              else{
                console.log('count incremented by 1')
                res.redirect('/usercart');
              }
            })
          }
          }
          else{
            console.log('no count val')
          }
    
        }
      })
    }
      else{
        res.redirect('/home')
      }
  }
  exports.deletecart=(req,res)=>{
    if(req.session.role=="user"){
      var id=req.params.id;
      var usernam=req.session.username;
      var query=`DELETE FROM cart WHERE username='${usernam}' and id='${id}'`;
      connection.query(query,(err)=>{
        if(err) throw err
        else{
          console.log('item removed successfully');
          res.redirect('/usercart')
        }
      })
     
    }
      else{
        res.redirect('/home')
      }
  }