var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "fileManager";
router.use(express.json());
/* POST register */
router.post("/", function (req, res, next) {
  //Use connect method to connect to the Server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("user");
    //Get first two documents that match the query
    col.find({loginName: req.body.loginName}).toArray(function (err, docs) {
      assert.equal(null, err);
      if(docs.length!==0) return res.status(401).json({errCode: 2, errMessage: 2, data: null});
      res.json({errCode: null, errMessage: null, data: true});
      
      col.insert(req.body, function(err, r) {
        assert.equal(null, err);
        client.close();
      });
      
   });
   
  
  });
});
module.exports = router;
