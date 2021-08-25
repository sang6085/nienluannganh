var express = require("express");
var router = express.Router();
var md5 = require('md5');
require('dotenv').config();
const jwt= require('jsonwebtoken');
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
router.get("/select_list",verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const {page, pageSize, search}=req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("account");
    // Get first two documents that match the query
    col.find({name: {$regex: search?search.trim():'', $options: 'i'}, deletedBy: 0}).limit(Number(pageSize)).skip(Number(pageSize*page)).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      res.json({erorCode: null, data: {totalCount: docs.length, listData: docs}});
      client.close();
    });
  });
});
/* GET userProfile. */
router.get("/profile",verifyToken, function (req, res, next) {
    // Use connect method to connect to the Server
    console.log(req.isAdmin);
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const userId=objectId(req.userId);
      const col = db.collection("account");
      // Get first two documents that match the query
      col.find({_id: userId}).toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        res.json({errorCode: null, data: {name: docs[0].name}});
        client.close();
      });
    });
  });

  router.post("/login", function (req, res, next) {
    // Use connect method to connect to the Server
    const loginName = req.body.loginName;
    const password=md5(req.body.password);
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
  
      const db = client.db(dbName);
  
      const col = db.collection("account");
      // Get first two documents that match the query
      col.find({"loginName": loginName, "password": password, "deletedBy": 0}).toArray(function (err, docs) {
        assert.equal(null, err);
         
        if(docs.length===0) return res.status(401).json({errorCode: 1, data: null});
        const accessToken=jwt.sign({"userId": docs[0]._id, "isAdmin": docs[0].isAdmin}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3600s'});
        res.json({errorCode: null, data: {accessToken}});
      });
    });
  });

  router.post("/register", function (req, res, next) {
    //Use connect method to connect to the Server
    var date=new Date().toLocaleDateString('en-GB');
    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      const col = db.collection("account");
      //Get first two documents that match the query
      col.find({loginName: req.body.loginName, deletedBy: 0}).toArray(function (err, docs) {
        assert.equal(null, err);
        if(docs.length!==0) return res.status(401).json({errorCode: 2, data: null});
        const createData={
          name: req.body.name,
          loginName: req.body.loginName,
          password: md5(req.body.password),
          isAdmin: false,
          createdBy: 0,
          createdDate: date,
          lastModifiedBy: 0,
          lastModifiedDate: 0,
          deletedBy: 0,
          deletedDate: 0
        }
        
        col.insert(createData, function(err, r) {
          assert.equal(null, err);
          db.collection('tenant').insert({
            licenseId: "611ab02ceefd13f51b911494",
            storageMax: 0,
            storageUsed: 0,
            createdBy: createData._id,
            createdDate: date,
            lastModifiedDate: 0,
            lastModifiedBy: 0,
            deletedBy: 0,
            deletedDate: 0,
  
  
          }, function(err, r) {
            assert.equal(null, err);
            
            res.json({errorCode: null, data: true});
            client.close();
          });
        });
        
     });
     
    
    });
  });

module.exports = router;
