
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
router.get("/team/get", (req, res) => main.getteam(req, res));
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
module.exports = router;
