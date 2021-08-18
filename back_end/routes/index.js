var express = require("express");
var router = express.Router();
const login=require("./login");
const user=require("./user");
const register=require("./register");
const category=require("./category");
const license=require("./license");
const folder=require("./folder");
const tenant=require("./tenant");
router.use(express.json());
router.use("/api/v3/login", login);
router.use("/api/v3/user",user);
router.use("/api/v3/register",register);
router.use("/api/v3/category",category);
router.use("/api/v3/license",license);
router.use("/api/v3/folder",folder);
router.use("/api/v3/tenant",tenant);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
