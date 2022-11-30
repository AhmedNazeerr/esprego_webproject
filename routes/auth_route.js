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
const auth = require("../controller/auth");
const router=express.Router();

//auth verification
router.post("/account", (req, res) => auth.login(req, res));
router.post("/register",async(req, res) => auth.register(req, res));
router.get("/user", (req, res) => auth.loggedin(req,res));
router.get("/signout", (req, res) => auth.signout(req,res));
router.get("/adminsignout", (req, res) => auth.adminsignout(req,res));
router.post("/verify", (req, res) => auth.getverify(req, res));
router.post("/verify_login", (req, res) => auth.getverifylogin(req, res));
router.post("/verify_login_change_password", (req, res) => auth.getverifyloginchangepassword(req, res));
router.post("/account_changepassword", (req, res) => auth.changepassword(req, res));

module.exports = router;