//inbuilt modules
const express=require('express')
const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./views/images");
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });
// C:\Users\LENOVO\Videos\Web Project\views\images
const upload = multer({ dest: '.../views/images' })
// const upload = multer({ storage: storage })


//custom modules
const api_prod = require("../controller/api_product");
const router=express.Router();
// restful api for product
router.get("/admin/product", (req, res) => api_prod.getproductadmin(req, res));
router.get("/admin/product/delete/:id", (req, res) => api_prod.delproduct(req, res));
router.get("/admin/product/add", (req, res) => api_prod.productadd(req, res));

router.post("/admin/product/add",upload.array('images', 1000000), (req, res) => api_prod.addproduct(req, res));
router.get("/admin/product/update", (req, res) => api_prod.updateproduct(req, res));
router.post("/admin/product/update",upload.array('images', 1000000), (req, res) => api_prod.updateproductpost(req, res));


module.exports = router;
