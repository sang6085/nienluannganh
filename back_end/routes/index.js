var express = require("express");
var router = express.Router();
const account=require("./account");
const category=require("./category");
const license=require("./license");
const folder=require("./folder");
const tenant=require("./tenant");
const file=require("./file");
router.use(express.json());
router.use("/api/v3/account",account);
router.use("/api/v3/category",category);
router.use("/api/v3/license",license);
router.use("/api/v3/folder",folder);
router.use("/api/v3/tenant",tenant);
router.use("/api/v3/file",file);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
