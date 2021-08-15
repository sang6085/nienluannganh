var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const verifyToken=require("./middleware/auth");
const objectId= require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Names
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
router.get("/list",verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const {page, pageSize, search}=req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("category");
    // Get first two documents that match the query
    col.find({name: {$regex: search?search.trim():'', $options: 'i'}, createBy: req.userId, deleteBy: 0}).limit(Number(pageSize)).skip(Number(pageSize*page)).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      res.json({errCode: null, errMessage: null, data: {totalCount: docs.length, listData: docs}});
      client.close();
    });
  });
});
/* POST category. */
router.post("/", verifyToken, function (req, res, next) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const col = db.collection("category");
      if(req.body.id===undefined  || req.body.id==0){
           
            col.insert({name: req.body.name, createBy: req.userId, deleteBy: 0}, function(err, r) {
                assert.equal(null, err);
                res.json({errCode: null, errMessage: null, data: true});
            });
        }
      else {
        // Modify and return the modified document
    col.findOneAndUpdate({_id: objectId(req.body.id)}, {$set: {name: req.body.name, createBy: req.userId}}, {upsert: false
    }, function(err, r) {
      assert.equal(null, err);
      })
      res.json({errCode: null, errMessage: null, data: true});
    }
    });
  });
  /* DELETE category. */
router.delete("/:id", verifyToken, function (req, res, next) {
    //Use connect method to connect to the Server
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const col = db.collection("category");
    // Remove and return a document
    
      col.findOneAndUpdate({_id: objectId(req.params.id)}, {$set: {deleteBy: req.userId}}, {upsert: false
      }, function(err, r) {
        assert.equal(null, err);
        })
        res.json({errCode: null, errMessage: null, data: true});
    });
  });
module.exports = router;
