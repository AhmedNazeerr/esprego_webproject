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


    const accounts=function (callback){
        exports.getuseradmin=(req,res)=>{
          var query=`Select * from account`;
          connection.query(query,(err,result)=>{
            if(err) throw err;
            else{
              callback(result)
            }
          }) 
        };
    };

     const  generateCode=()=>{
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
      }
    
   const getconnection=()=>{
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
    else{
        connection.end();
        return 1;
    }
  });
}
   
module.exports={findallcontacts,generateCode,getconnection,accounts};