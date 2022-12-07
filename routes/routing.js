//inbuilt modules
const express=require('express')

var Publishable_Key = 'pk_test_51MAYfpAwwbDag0BAeneNbXYjmnStdxjmvnqp9DDD5Nu4FJXZRKATZ29gXMVr3vexVcmxkEKd7DhOTmmQr3JEvscz008f6oygMh'
var Secret_Key = 'sk_test_51MAYfpAwwbDag0BAoo6Far5nMhrrj8vtIeQO7jCbxxbmqiwDqlF6HJGaKuUwnWRggVftWrUZ8FYwxUiev0BEZ4Is00Amck2Esa'
const stripe = require('stripe')(Secret_Key) 



const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./views/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
const upload = multer({ dest: './views/images' })
// const upload = multer({ storage: storage });


//custom modules
const main = require("../controller/main");
const report_gen = require("../controller/report_gen");

const router=express.Router();


router.get("/", (req, res) => main.servehome(req, res));
router.get("/home", (req, res) => main.servehome(req, res));

router.post("/contactus", (req, res) => main.contactus(req, res));
router.get("/contactadmin", (req, res) => main.contactadmin(req, res));
router.get("/customer_support", (req, res) => main.customer_admin(req, res));
router.post("/customer_support", (req, res) => main.customer_admin_post(req, res));







router.get("/about", (req, res) => main.serveaboutus(req, res));
router.get("/team", (req, res) => main.getteam(req, res));
router.get("/searchteam", (req, res) => main.getsearchteam(req, res));
router.get("/product", (req, res) => main.justcheck(req, res));
router.get("/searchproduct", (req, res) => main.filterproduct(req, res));
router.get("/teamdetail/:id", (req, res) => main.getteamdetail(req, res));
router.get("/productdetail/:id", (req, res) => main.getproductdetail(req, res));
router.get("/account", (req, res) => main.getaccpage(req, res));


router.post("/userupdate",upload.single("image"), (req, res) => main.updateuserpost(req, res));
router.get("/update", (req, res) => main.updateloguser(req, res));
router.get("/changeuserpass", (req, res) => main.changeuserpass(req, res));
router.post("/changeuserpass", (req, res) => main.changeuserpasspost(req, res));
router.get("/userdash", (req, res) => main.userdash(req, res));


// router.get("/add_rev/:id", (req, res) => main.addrev(req, res));

router.post("/add_rev", (req, res) => main.addrevpost(req, res));

router.get("/reply/:username/:prodid/:id", (req, res) => main.renderreply(req, res));
router.post("/reply_rev", (req, res) => main.renderreplypost(req, res));





router.get("/getorderdetails/:id", (req, res) => main.orderdetail(req, res));








//admin panel route
router.get("/dash", (req, res) => main.getdash(req, res));







router.get("/scrap", (req, res) => main.scrapper(req, res));


router.post("/checkout",(req,res)=>main.getcheckout(req,res));
router.post("/postcheckout",(req,res)=>main.postcheckout(req,res));


router.get("/adminorderdetails/:id",(req,res)=>main.adminorderdetail(req,res));




router.get("/orderstatus/:orderid",(req,res)=>main.changeorderstatus(req,res));


router.get('/showallorders',(req,res)=>main.showall(req,res));
router.get('/showallearnings',(req,res)=>main.showallearn(req,res));




// router.get('/eachearndetail',(req,res)=>main.eachearn(req,res));

router.get("/eachdetail/:id", (req, res) => main.eachdetails(req, res));


router.get("/cancelorder/:id", (req, res) => main.cancelorder(req, res));






router.get("/refund/:id", (req, res) => main.refund(req, res));

router.get("/delpay/:id", (req, res) => main.delpay(req, res));







router.post("/paymentpost",(req,res)=>main.paymentpost(req,res));


router.get("/pastorder",(req,res)=>main.pastorder(req,res));


router.get("/showallpay",(req,res)=>main.showallpay(req,res));


router.get("/showallorder",(req,res)=>main.showallorder(req,res));


router.get("/getmenu",(req,res)=>main.getmenu(req,res));


router.post("/addtocartpastorder",(req,res)=>main.pastorderaddtocart(req,res));














//check
router.get("/justcheck",(req,res)=>main.justcheck(req,res));

router.get("/getwishlist",(req,res)=>main.getwishlist(req,res));

router.post("/addtowishlist",(req,res)=>main.addtowishlist(req,res));

router.get("/wishlistdelete/:id",(req,res)=>main.deletewishlist(req,res));








//createfaq
router.get("/admin/add/faq",(req,res)=>main.addfaq(req,res));

router.post("/admin/add/faq",(req,res)=>main.addfaqpost(req,res));


router.get("/allfaq",(req,res)=>main.getallfaq(req,res));

router.get("/showallscraps",(req,res)=>main.getallscrap(req,res));


router.get("/deletefaq/:id",(req,res)=>main.deletefaq(req,res));


router.get("/genreports",(req,res)=>main.getallrepos(req,res));

















module.exports = router;
