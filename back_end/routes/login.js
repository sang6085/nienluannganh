require('dotenv').config();

var express = require("express");
var router = express.Router();
const jwt= require('jsonwebtoken');

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
router.post("/", function (req, res, next) {
  // Use connect method to connect to the Server
  const loginName = req.body.loginName;
  const password=req.body.password;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    const col = db.collection("user");
    // Get first two documents that match the query
    col.find({"loginName": loginName, "password": password}).toArray(function (err, docs) {
      assert.equal(null, err);
       
      if(docs.length===0) return res.status(401).json({errCode: 1, errMessage: 1});
      const accessToken=jwt.sign({"userId": docs[0]._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3600s'});
      res.json({errCode: null, errMessage: null, data: {accessToken}});
    });
  });
});

module.exports = router;
