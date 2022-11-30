const express=require('express')
const path=require("path")
const mysql = require('mysql'); 
const bodyparser=require('body-parser');
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
const port=3000
const main = require("../controller/main");
const router=express.Router();
router.get("/", (req, res) => main.servehome(req, res));
router.get("/home", (req, res) => main.servehome(req, res));
router.get("/contact", (req, res) => main.servecontactus(req, res));
router.get("/about", (req, res) => main.serveaboutus(req, res));
router.get("/team", (req, res) => main.getteam(req, res));
router.get("/searchteam", (req, res) => main.getsearchteam(req, res));
router.get("/admin/team/add", (req, res) => main.teamadd(req, res));
router.post("/admin/team/add",upload.single("image"), (req, res) => main.addteam(req, res));
router.get("/admin/team", (req, res) => main.getteamadmin(req, res));
router.get("/admin/team/update", (req, res) => main.updateteam(req, res));
router.post("/admin/team/update",upload.single("image"), (req, res) => main.updateteampost(req, res));
router.get("/admin/team/delete/:id", (req, res) => main.delteam(req, res));
router.get("/admin/product", (req, res) => main.getproductadmin(req, res));
router.get("/admin/product/delete/:id", (req, res) => main.delproduct(req, res));
router.get("/admin/product/add", (req, res) => main.productadd(req, res));
router.post("/admin/product/add",upload.single("image"), (req, res) => main.addproduct(req, res));
router.get("/admin/product/update", (req, res) => main.updateproduct(req, res));
router.post("/admin/product/update",upload.single("image"), (req, res) => main.updateproductpost(req, res));
router.get("/product", (req, res) => main.getproduct(req, res));
router.get("/searchproduct", (req, res) => main.filterproduct(req, res));
router.get("/teamdetail/:id", (req, res) => main.getteamdetail(req, res));
router.get("/productdetail/:id", (req, res) => main.getproductdetail(req, res));
router.get("/account", (req, res) => main.getaccpage(req, res));
router.post("/account", (req, res) => main.login(req, res));
router.post("/register",async(req, res) => main.register(req, res));
router.get("/user", (req, res) => main.loggedin(req,res));
router.get("/signout", (req, res) => main.signout(req,res));
router.get("/adminsignout", (req, res) => main.adminsignout(req,res));
router.get("/admin/user", (req, res) => main.getuseradmin(req, res));
router.get("/admin/user/update", (req, res) => main.updateuser(req, res));
router.post("/admin/user/update", (req, res) => main.updateuserpost(req, res));
router.get("/admin/user/delete/:id", (req, res) => main.deluser(req, res));
module.exports = router;

//similar routes
//file structure same, only include 'api' in header

