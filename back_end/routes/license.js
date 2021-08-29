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
// router.get("/", verifyToken, function (req, res, next) {
//   // Use connect method to connect to the Server
//   const { page, pageSize, search } = req.query;
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     const col = db.collection("license");
//     // Get first two documents that match the query
//     let totalCount = 0;
//     col
//       .find({ createdBy: req.userId, deletedBy: 0 })
//       .toArray(function (err, docs) {
//         assert.equal(null, err);
//         // console.log(docs.length);
//         totalCount = docs.length;
//       });

//     col
//       .find({
//         name: { $regex: search ? search.trim() : "", $options: "i" },
//         createdBy: req.userId,
//         deletedBy: 0,
//       })
//       .limit(Number(pageSize))
//       .skip(Number(pageSize * page))
//       .toArray(function (err, docs) {
//         assert.equal(null, err);
//         // console.log(docs.length);
//         const data = docs.map((item) => {
//           return {
//             id: item._id,
//             name: item.name,
//             noDay: item.noDay,
//             noMonth: item.noMonth,
//             noYear: item.noYear,
//             price: item.price,
//             storageSize: item.storageSize,
//           };
//         });
//         res.json({
//           errCode: null,
//           errMessage: null,
//           data: { totalCount, listData: data },
//         });
//         client.close();
//       });
//   });
// });
/* GET home page. */
router.get("/select_list", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  // MongoClient.connect(url, function (err, client) {
  //   assert.equal(null, err);
  //   const db = client.db(dbName);
  //   const col = db.collection("license");

  //   col.find({createdBy: req.userId, deletedBy: 0}).toArray(function (err, docs) {
  //     assert.equal(null, err);
  //     // console.log(docs.length);
  //     const data=docs.map((item)=>{
  //       return {id: item._id, name: item.name, noDay: item.noDay, noMonth: item.noMonth, noYear: item.noYear, price: item.price, storageSize: item.storageSize}
  //     })
  //     res.json({errorCode: null, data: {options: data}});
  //     client.close();
  //   });
  // });
  const { page, pageSize, search } = req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("license");
    // Get first two documents that match the query
    let totalCount = 0;
    col
      .find({
        name: { $regex: search ? search.trim() : "", $options: "i" },
        deletedBy: 0,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        //console.log(docs.length);
        totalCount = docs.length;
      });

    col
      .find({
        name: { $regex: search ? search.trim() : "", $options: "i" },
        deletedBy: 0,
      })
      .limit(Number(pageSize))
      .skip(Number(pageSize * page))
      .toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        const data = docs.map((item) => {
          return {
            id: item._id,
            name: item.name,
            noDay: item.noDay,
            noMonth: item.noMonth,
            noYear: item.noYear,
            price: item.price,
            storageSize: item.storageSize,
          };
        });
        res.json({ errorCode: null, data: { totalCount, listData: data } });
        client.close();
      });
  });
});
router.get("/get_all", verifyToken, function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("license");
    // Get first two documents that match the query
    col
      .find({
        deletedBy: 0,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.json({ errorCode: null, data: docs });
      });
  });
});
router.get("/:id", verifyToken, function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("license");
    // Get first two documents that match the query
    col
      .find({
        deletedBy: 0,
        _id: objectId(req.params.id),
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        res.json({ errorCode: null, data: docs[0] });
      });
  });
});
/* POST category. */
router.post("/", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("license");
    if (
      req.body.name === undefined ||
      //req.body.noDay === undefined ||
      req.body.noMonth === undefined ||
      //req.body.noYear === undefined ||
      req.body.price === undefined ||
      req.body.storageSize === undefined
    )
      return res.sendStatus(400);

    if (req.body.id === undefined || req.body.id == 0) {
      const createData = {
        name: req.body.name,
        noDay: 0,
        noMonth: req.body.noMonth,
        noYear: 0,
        price: req.body.price,
        storageSize: req.body.storageSize,
        createdBy: req.userId,
        createdDate: date,
        lastModifiedBy: 0,
        lastModifiedDate: 0,
        deletedBy: 0,
        deleteDate: 0,
      };
      col.insert(createData, function (err, r) {
        assert.equal(null, err);
        res.json({ errorCode: null, data: true });
      });
    } else {
      // Modify and return the modified document
      const updateData = {
        name: req.body.name,
        //noDay: req.body.noDay,
        noMonth: req.body.noMonth,
        //noYear: req.body.noYear,
        price: req.body.price,
        storageSize: req.body.storageSize,
        lastModifiedBy: req.userId,
        lastModifiedDate: date,
      };
      col.findOneAndUpdate(
        { _id: objectId(req.body.id) },
        { $set: updateData },
        { upsert: false },
        function (err, r) {
          assert.equal(null, err);
        }
      );
      db.collection("tenant").updateMany(
        { licenseId: req.body.id },
        {
          $set: {
            storageMax: req.body.storageSize,
            licenseName: req.body.name,
          },
        },
        { upsert: false, multi: true },
        function (err, r) {
          assert.equal(null, err);
          res.json({ errorCode: null, data: true });
        }
      );
    }
  });
});
/* DELETE category. */
router.delete("/:id", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("license");
    // Remove and return a document
    if (req.params.id === "611ab02ceefd13f51b911494")
      return res.status(401).json({ errorCode: 12, data: null });

    col.findOneAndUpdate(
      { _id: objectId(req.params.id) },
      { $set: { deletedBy: req.userId, deletedDate: date } },
      { upsert: false },
      function (err, r) {
        assert.equal(null, err);
      }
    );
    res.json({ errorCode: null, data: true });
  });
});
module.exports = router;
