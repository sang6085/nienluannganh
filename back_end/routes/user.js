var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const verifyToken=require("./middleware/auth");
const objectId= require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
router.get("/list",verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const {page, pageSize, search}=req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("user");
    // Get first two documents that match the query
    col.find({name: {$regex: search?search.trim():'', $options: 'i'}}).limit(Number(pageSize)).skip(Number(pageSize*page)).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      res.json({errCode: null, errMessage: null, data: {totalCount: docs.length, listData: docs}});
      client.close();
    });
  });
});
/* GET userProfile. */
router.get("/profile",verifyToken, function (req, res, next) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const userId=objectId(req.userId);
      const col = db.collection("user");
      // Get first two documents that match the query
      col.find({_id: userId}).toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        res.json({errCode: null, errMessage: null, data: {name: docs[0].name}});
        client.close();
      });
    });
  });
module.exports = router;
