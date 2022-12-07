//inbuilt modules
const express=require('express')

//custom modules
const report_gen = require("../controller/report_gen");

const router=express.Router();


//report gen routes
// router.get("/getpdf", (req, res) => report_gen.generatepdfprod(req, res));
// router.get("/getpdff", (req, res) => report_gen.generatepdfteam(req, res));
router.get("/prepo",(req,res)=>report_gen.generatepdfprod(req,res));
router.get("/erepo",(req,res)=>report_gen.generatepdfteam(req,res));
router.get("/trepo",(req,res)=>report_gen.generatepdfearn(req,res));

module.exports = router;
