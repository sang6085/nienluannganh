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
router.get("/",verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const {page, pageSize, search}=req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("category");
    // Get first two documents that match the query
    let totalCount=0;
    col.find({createdBy: req.userId, deletedBy: 0}).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      totalCount=docs.length;
    });

    col.find({name: {$regex: search?search.trim():'', $options: 'i'}, createdBy: req.userId, deletedBy: 0}).limit(Number(pageSize)).skip(Number(pageSize*page)).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      const data=docs.map((item)=>{
        return {id: item._id, name: item.name}
      })
      res.json({errCode: null, errMessage: null, data: {totalCount, listData: data}});
      client.close();
    });
  });
});
/* GET home page. */
router.get("/select_list",verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("category");

    col.find({createdBy: req.userId, deletedBy: 0}).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      const data=docs.map((item)=>{
        return {id: item._id, name: item.name}
      })
      res.json({errCode: null, errMessage: null, data: {options: data}});
      client.close();
    });
  });
});
/* POST category. */
router.post("/", verifyToken, function (req, res, next) {
    // Use connect method to connect to the Server
    //console.log(new Date());
    var date=new Date().toLocaleDateString('en-GB');
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const col = db.collection("category");
      if(req.body.id===undefined  || req.body.id==0){
           
            col.insert({name: req.body.name, createdBy: req.userId,createdDate: date, lastModifiedBy: 0, lastModifiedDate: 0, deletedBy: 0, deletedDate: 0}, function(err, r) {
                assert.equal(null, err);
                res.json({errCode: null, errMessage: null, data: true});
            });
        }
      else {
        // Modify and return the modified document
    col.findOneAndUpdate({_id: objectId(req.body.id)}, {$set: {name: req.body.name, lastModifiedBy: req.userId, lastModifiedDate: date}}, {upsert: false
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
    var date=new Date().toLocaleDateString('en-GB');
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const col = db.collection("category");
    // Remove and return a document
    
      col.findOneAndUpdate({_id: objectId(req.params.id)}, {$set: {deletedBy: req.userId, deletedDate: date}}, {upsert: false
      }, function(err, r) {
        assert.equal(null, err);
        })
        res.json({errCode: null, errMessage: null, data: true});
    });
  });
module.exports = router;
