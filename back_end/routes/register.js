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
  var date=new Date().toLocaleDateString('en-GB');
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("user");
    //Get first two documents that match the query
    col.find({loginName: req.body.loginName, deletedBy: 0}).toArray(function (err, docs) {
      assert.equal(null, err);
      if(docs.length!==0) return res.status(401).json({errCode: 2, errMessage: 2, data: null});
      const createData={
        name: req.body.name,
        loginName: req.body.loginName,
        password: req.body.password,
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
          
          res.json({errCode: null, errMessage: null, data: true});
          client.close();
        });
      });
      
   });
   
  
  });
});
module.exports = router;
