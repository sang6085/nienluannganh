var express = require("express");
var router = express.Router();
var md5 = require("md5");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const verifyToken = require("./middleware/auth");
const objectId = require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
// router.get("/select_list", verifyToken, function (req, res, next) {
//   // Use connect method to connect to the Server
//   const { page, pageSize, search } = req.query;
//   MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);
//     const db = client.db(dbName);
//     const col = db.collection("account");
//     // Get first two documents that match the query
//     let totalCount = 0;
//     col
//       .find({
//         loginName: { $regex: search ? search.trim() : "", $options: "i" },
//         deletedBy: 0,
//         isAdmin: false,
//       })
//       .toArray(function (err, docs) {
//         assert.equal(null, err);
//         // console.log(docs.length);
//         totalCount = docs.length;
//       });
//     col
//       .find({
//         loginName: { $regex: search ? search.trim() : "", $options: "i" },
//         isAdmin: false,
//         deletedBy: 0,
//       })
//       .limit(Number(pageSize))
//       .skip(Number(pageSize * page))
//       .toArray(function (err, docs) {
//         assert.equal(null, err);
//         // console.log(docs.length);
//         const data = docs.map((user) => {
//           return {
//             id: user._id,
//             name: user.name,
//             loginName: user.loginName,
//           };
//         });
//         res.json({
//           erorCode: null,
//           data: { totalCount, listData: data },
//         });
//         client.close();
//       });
//   });
// });
/* GET userProfile. */
router.get("/profile", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const userId = objectId(req.userId);
    const col = db.collection("account");
    let dataLicense = 0;
    // Get first two documents that match the query
    db.collection("tenant")
      .find({ createdBy: objectId(req.userId) })
      .toArray(function (err, docs) {
        dataLicense = docs[0];
      });

    col.find({ _id: userId }).toArray(function (err, docs) {
      assert.equal(null, err);
      // console.log(docs.length);
      res.json({
        errorCode: null,
        data: {
          name: docs[0].name,
          loginName: docs[0].loginName,
          isAdmin: docs[0].isAdmin,
          licenseName: dataLicense.licenseName,
          boughtDate: dataLicense.boughtDate,
          expiredDate: dataLicense.expiredDate,
        },
      });

      client.close();
    });
  });
});

router.post("/login", function (req, res, next) {
  // Use connect method to connect to the Server
  const loginName = req.body.loginName;
  const password = md5(req.body.password);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);

    const col = db.collection("account");
    // Get first two documents that match the query
    col
      .find({ loginName: loginName, password: password, deletedBy: 0 })
      .toArray(function (err, docs) {
        assert.equal(null, err);

        if (docs.length === 0)
          return res.status(401).json({ errorCode: 1, data: null });
        const accessToken = jwt.sign(
          { userId: docs[0]._id, isAdmin: docs[0].isAdmin },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "28800s" }
        );
        res.json({ errorCode: null, data: { accessToken } });
      });
  });
});

router.post("/register", function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("account");
    //Get first two documents that match the query
    col
      .find({ loginName: req.body.loginName, deletedBy: 0 })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        if (docs.length !== 0)
          return res.status(401).json({ errorCode: 2, data: null });
        const createData = {
          name: req.body.name,
          loginName: req.body.loginName,
          password: md5(req.body.password),
          isAdmin: false,
          createdBy: 0,
          createdDate: date,
          lastModifiedBy: 0,
          lastModifiedDate: 0,
          deletedBy: 0,
          deletedDate: 0,
        };

        col.insert(createData, function (err, r) {
          assert.equal(null, err);
          db.collection("license")
            .find({ _id: objectId("611ab02ceefd13f51b911494") })
            .toArray(function (err, docs) {
              assert.equal(null, err);
              const storageSize = docs[0].storageSize;
              const licenseName = docs[0].name;
              db.collection("tenant").insert(
                {
                  licenseId: "611ab02ceefd13f51b911494",
                  storageMax: storageSize,
                  storageUsed: 0,
                  licenseName: licenseName,
                  boughtDate: date,
                  expiredDate: date,
                  createdBy: createData._id,
                  createdDate: date,
                  lastModifiedDate: 0,
                  lastModifiedBy: 0,
                  deletedBy: 0,
                  deletedDate: 0,
                },
                function (err, r) {
                  assert.equal(null, err);

                  res.json({ errorCode: null, data: true });
                  client.close();
                }
              );
            });
        });
      });
  });
});
/* DELETE category. */
router.delete("/:id", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("account");
    // Remove and return a document
    db.collection("account")
      .find({
        _id: objectId(req.params.id),
        deletedBy: 0,
      })
      .toArray((err, docs) => {
        db.collection("share").updateMany(
          { shareTo: docs[0].loginName, deletedBy: 0 },
          { $set: { deletedBy: req.userId, deletedDate: date } },
          { upsert: false },
          function (err, r) {
            assert.equal(null, err);
          }
        );
      });
    db.collection("tenant").findOneAndUpdate(
      { createdBy: objectId(req.params.id) },
      { $set: { deletedBy: req.userId, deletedDate: date } },
      { upsert: false },
      function (err, r) {
        assert.equal(null, err);
      }
    );

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

/* DELETE category. */
router.get("/select_list", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  //var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const { page, pageSize, search } = req.query;
    const db = client.db(dbName);
    const col = db.collection("account");
    // Remove and return a document
    let totalCount = 0;
    col
      .aggregate([
        {
          $match: {
            loginName: { $regex: search ? search.trim() : "", $options: "i" },
            isAdmin: false,
            deletedBy: 0,
          },
        },
        {
          $lookup: {
            from: "tenant",
            localField: "_id",
            foreignField: "createdBy",
            as: "list",
          },
        },
        { $unwind: "$list" },
        // { $match: { "list.licenseId": { $ne: "611ab02ceefd13f51b911494" } } },
        //{ $limit: Number(pageSize) },
        //{ $skip: Number(page * pageSize) },
      ])

      .toArray(function (err, docs) {
        totalCount = docs.length;
      });
    col
      .aggregate([
        {
          $match: {
            loginName: { $regex: search ? search.trim() : "", $options: "i" },
            isAdmin: false,
            deletedBy: 0,
          },
        },
        {
          $lookup: {
            from: "tenant",
            localField: "_id",
            foreignField: "createdBy",
            as: "list",
          },
        },
        { $unwind: "$list" },
        // { $match: { "list.licenseId": { $ne: "611ab02ceefd13f51b911494" } } },
        { $limit: Number(pageSize) },
        { $skip: Number(page * pageSize) },
      ])

      .toArray((err, docs) => {
        // const dataNew=docs.map((item)=>{
        //   return {
        //     idUser: item._id
        //   }
        // })

        const dataNew = docs.map((item) => {
          return {
            id: item._id,
            name: item.name,
            loginName: item.loginName,
            tenantId: item.list._id,
            licenseId: item.list.licenseId,
            storageMax: item.list.storageMax,
            storageUsed: item.list.storageUsed,
            licenseName: item.list.licenseName,
            boughtDate: item.list.boughtDate,
            expiredDate: item.list.expiredDate,
            //licenseName: licenseName,
          };
          // console.log(item.list[0].storageMax);
        });
        // console.log(docs);
        res.json({ erorCode: null, data: { totalCount, listData: dataNew } });
      });
  });
});

module.exports = router;
