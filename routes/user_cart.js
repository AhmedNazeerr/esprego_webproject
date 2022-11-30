//inbuilt modules

const express=require('express')

//custom modules
const cart = require("../controller/api_cart");


const router=express.Router();

router.get("/usercart", (req, res) => cart.getusercart(req, res));
router.post("/addtocart", (req, res) => cart.addtocart(req, res));
router.get("/inccount/:id", (req, res) => cart.increasecount(req, res));
router.get("/deccount/:id", (req, res) => cart.decreasecount(req, res));
router.get("/cartdelete/:id", (req, res) => cart.deletecart(req, res));
router.get("/usercart", (req, res) => cart.getusercart(req, res));
module.exports = router;
