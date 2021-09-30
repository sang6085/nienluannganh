var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const verifyToken = require("./middleware/auth");
const objectId = require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Names
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
router.get("/", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const { page, pageSize, search, parentId } = req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("tenant");
    // Get first two documents that match the query
    col
      .find({ createdBy: objectId(req.userId), deletedBy: 0 })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        res.json({
          errorCode: null,
          data: {
            id: docs[0]._id,
            storageMax: docs[0].storageMax,
            storageUsed: docs[0].storageUsed,
          },
        });
      });
  });
});
/* GET home page. */
// router.get("/select_list",verifyToken, function (req, res, next) {
//   // Use connect method to connect to the Server
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     const col = db.collection("tenant");

//     col.find({createdBy: req.userId, deletedBy: 0,parentId: req.body.parentId}).toArray(function (err, docs) {
//       assert.equal(null, err);
//       // console.log(docs.length);
//       const data=docs.map((item)=>{
//         return {id: item._id, name: item.name, categoryId:item.categoryId}
//       })
//       res.json({errorCode: null, data: {options: data}});
//       client.close();
//     });
//   });
// });
/* POST tenant. */
router.post("/", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  //console.log(new Date());
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("tenant");
    const { id, licenseId, licenseName, boughtDate, expiredDate } = req.body;
    // Modify and return the modified document
    db.collection("license")
      .find({ _id: objectId(licenseId) })
      .toArray(function (err, docs) {
        const storageMax = docs[0].storageSize;
        col.findOneAndUpdate(
          { createdBy: objectId(id) },
          {
            $set: {
              licenseName: licenseName,
              licenseId: licenseId,
              storageMax: storageMax,
              boughtDate: boughtDate,
              expiredDate: expiredDate,
              lastModifiedBy: req.userId,
              lastModifiedDate: date,
            },
          },
          { upsert: false },
          function (err, r) {
            assert.equal(null, err);
            res.json({ errorCode: null, data: true });
          }
        );
      });
  });
});
router.post("/post", verifyToken, function (req, res, next) {
  var dateNow = new Date().toLocaleDateString("en-GB");
  const str = dateNow.split("/");
  const date = new Date(str[2], str[1], str[0]);
  const addMonth = date.setMonth(date.getMonth() + req.body.noMonth - 1);
  var dateNew = new Date(addMonth);
  const expiredDate = dateNew.toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("tenant");
    const { licenseId, licenseName } = req.body;
    const idUser = req.userId;
    // Modify and return the modified document
    db.collection("license")
      .find({ _id: objectId(licenseId) })
      .toArray(function (err, docs) {
        const storageMax = docs[0].storageSize;
        col.findOneAndUpdate(
          { createdBy: objectId(idUser) },
          {
            $set: {
              licenseName: licenseName,
              licenseId: licenseId,
              storageMax: storageMax,
              boughtDate: dateNow,
              expiredDate: expiredDate,
              lastModifiedBy: req.userId,
              lastModifiedDate: dateNow,
            },
          },
          { upsert: false },
          function (err, r) {
            assert.equal(null, err);
            res.json({ errorCode: null, data: true });
          }
        );
      });
  });
  // console.log(date);
  // console.log("idTenant", req.body.licenseId);
  // console.log("name", req.body.licenseName);

  // console.log("dateNew", req.body.noMonth);
});
// /* DELETE category. */
// router.delete("/:id", verifyToken, function (req, res, next) {
//   //Use connect method to connect to the Server
//   var date = new Date().toLocaleDateString("en-GB");
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     const col = db.collection("tenant");
//     // Remove and return a document

//     col.findOneAndUpdate(
//       { _id: objectId(req.params.id) },
//       { $set: { deletedBy: req.userId, deletedDate: date } },
//       { upsert: false },
//       function (err, r) {
//         assert.equal(null, err);
//       }
//     );
//     res.json({ errorCode: null, data: true });
//   });
// });
module.exports = router;
