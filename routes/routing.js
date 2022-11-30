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







router.get("/about", (req, res) => main.serveaboutus(req, res));
router.get("/team", (req, res) => main.getteam(req, res));
router.get("/searchteam", (req, res) => main.getsearchteam(req, res));
router.get("/product", (req, res) => main.getproduct(req, res));
router.get("/searchproduct", (req, res) => main.filterproduct(req, res));
router.get("/teamdetail/:id", (req, res) => main.getteamdetail(req, res));
router.get("/productdetail/:id", (req, res) => main.getproductdetail(req, res));
router.get("/account", (req, res) => main.getaccpage(req, res));


//admin panel route
router.get("/dash", (req, res) => main.getdash(req, res));




module.exports = router;
