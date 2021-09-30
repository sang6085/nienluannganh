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
router.get("/select_list", verifyToken, function (req, res, next) {
  const { name } = req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("share");
    // Get first two documents that match the query
    col
      .find({
        shareTo: name,
        deletedBy: 0,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.json({ errorCode: null, data: docs });
      });
  });
});
router.get("/shareTo/select_list", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const { idFolder } = req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("share");
    // Get first two documents that match the query
    col
      .find({
        createdBy: req.userId,
        deletedBy: 0,
        idFolder: idFolder,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);

        res.json({ errorCode: null, data: docs });
        client.close();
      });
  });
});
/* GET home page. */
// router.get("/select_list",verifyToken, function (req, res, next) {
//   // Use connect method to connect to the Server
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     const col = db.collection("folder");

//     col.find({createdBy: req.userId, deletedBy: 0,parentId: req.body.parentId}).toArray(function (err, docs) {
//       assert.equal(null, err);
//       // console.log(docs.length);
//       const data=docs.map((item)=>{
//         return {id: item._id, name: item.name, categoryId:item.categoryId}
//       })
//       res.json({errCode: null, errMessage: null, data: {options: data}});
//       client.close();
//     });
//   });
// });
/* POST folder. */
router.post("/", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("folder");
    db.collection("share")
      .find({
        idFolder: req.body.idFolder,
        shareTo: req.body.name,
        deletedBy: 0
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);

        if (docs.length === 0) {
          db.collection("share").insert(
            {
              idFolder: req.body.idFolder,
              shareTo: req.body.name,
              folderName: req.body.folderName,
              createdBy: req.userId,
              createdDate: date,
              lastModifiedBy: 0,
              lastModifiedDate: 0,
              deletedBy: 0,
              deletedDate: 0,
            },
            function (err, r) {
              assert.equal(null, err);
            }
          );
        }
      });

    // Modify and return the modified document
    col.findOneAndUpdate(
      { _id: objectId(req.body.idFolder) },
      {
        $set: {
          shared: true,
        },
      },
      { upsert: false },
      function (err, r) {
        assert.equal(null, err);
      }
    );

    res.json({ errorCode: null, data: true });
  });
});
/* DELETE category. */
router.post("/delete", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  const { idFolder, name } = req.body;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("share");
    // Remove and return a document

    col.updateMany(
      { idFolder: idFolder, deletedBy: 0, shareTo: name },
      { $set: { deletedBy: req.userId, deletedDate: date } },
      { upsert: false },
      function (err, r) {
        assert.equal(null, err);
      }
    );
    res.json({ errorCode: null, data: true });
  });
});
router.get("/treeview/:id", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");

  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("folder");
    // Remove and return a document
    var parentId = req.params.id;
    for (let i = 0; i <= 2; i++) {
      //if (parentId === 0) break;
      console.log(parentId);
      col
        .find({
          createdBy: req.userId,
          deletedBy: 0,
          _id: objectId(parentId),
        })
        .toArray(function (err, docs) {
          assert.equal(null, err);
          // if (docs.length !== 0 && docs[0].parentId != 0) {
          //   parentId = docs[0].parentId;
          //   console.log(docs[0].name);
          //   console.log(docs[0].parentId);
          // }
          parentId = 0;
        });
      // console.log(docs[0].name);
      console.log(parentId);
    }
  });
});
module.exports = router;
