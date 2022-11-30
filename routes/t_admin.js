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
const api_team = require("../controller/api_team");
const router=express.Router();


// restful api for team
router.get("/admin/team/add", (req, res) => api_team.teamadd(req, res));
router.post("/admin/team/add",upload.single("image"), (req, res) => api_team.addteam(req, res));
router.get("/admin/team", (req, res) => api_team.getteamadmin(req, res));
router.get("/admin/team/update", (req, res) => api_team.updateteam(req, res));
router.post("/admin/team/update",upload.single("image"), (req, res) => api_team.updateteampost(req, res));
router.get("/admin/team/delete/:id", (req, res) => api_team.delteam(req, res));

module.exports = router;
