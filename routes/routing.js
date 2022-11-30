//inbuilt modules
const express=require('express')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./views/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


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
router.get("/product", (req, res) => main.getproduct(req, res));
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




//admin panel route
router.get("/dash", (req, res) => main.getdash(req, res));







router.get("/scrap", (req, res) => main.scrapper(req, res));

module.exports = router;
