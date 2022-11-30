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
const api_user = require("../controller/api_user");

const router=express.Router();


//restful api for users
router.get("/admin/user", (req, res) => api_user.getuseradmin(req, res));
router.get("/admin/user/update", (req, res) => api_user.updateuser(req, res));
router.post("/admin/user/update", (req, res) => api_user.updateuserpost(req, res));
router.get("/admin/user/delete/:id", (req, res) => api_user.deluser(req, res));

module.exports = router;
