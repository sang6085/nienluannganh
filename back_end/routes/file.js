var express = require("express");
var router = express.Router();
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var fileUpload = require("express-fileupload");
const verifyToken = require("./middleware/auth");
const objectId = require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Names
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
router.use(fileUpload());
router.post("/download", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const userId = req.body.userId == 0 ? req.userId : req.body.userId;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Get first two documents that match the query
    col
      .find({
        _id: objectId(req.body.id),
        createdBy: userId,
        deletedBy: 0,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.download(
          `./../back_end/public/upload/${
            req.body.id +
            docs[0].name.substring(
              docs[0].name.lastIndexOf("."),
              docs[0].name.length
            )
          }`,
          docs[0].name
        );
      });
  });
});
/* GET home page. */
router.get("/select_list", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const { page, pageSize, search, parentId } = req.query;
  const userId = req.query.userId == 0 ? req.userId : req.query.userId;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Get first two documents that match the query
    let totalCount = 0;
    col
      .find({
        createdBy: userId,
        deletedBy: 0,
        idFolder: parentId == 0 ? Number(parentId) : parentId,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        // console.log(docs.length);
        totalCount = docs.length;
      });

    col
      .find({
        name: { $regex: search ? search.trim() : "", $options: "i" },
        createdBy: userId,
        deletedBy: 0,
        idFolder: parentId == 0 ? Number(parentId) : parentId,
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
            size: item.size,
            type: item.type,
            createdBy: item.createdBy,
          };
        });
        res.json({ errorCode: null, data: { totalCount, listData: data } });
        client.close();
      });
  });
});
/* GET home page. */
router.post("/get_all", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const { parentId } = req.body;
  const userId = req.body.userId == 0 ? req.userId : req.body.userId;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Get first two documents that match the query
    col
      .find({
        createdBy: userId,
        deletedBy: 0,
        idFolder: parentId == 0 ? Number(parentId) : parentId,
      })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        res.json({ errorCode: null, data: docs });
        client.close();
      });
  });
});
/* POST file. */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload');
//       //console.log(file);
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
//   const upload = multer({ storage: storage }).single("file");
router.post("/", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const userId = req.query.userId == 0 ? req.userId : req.query.userId;
  //console.log(new Date());
  const file = req.files.file;
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    db.collection("tenant")
      .find({ createdBy: objectId(userId) })
      .toArray(function (err, docs) {
        assert.equal(null, err);
        const storageMax = docs[0].storageMax;
        const storageUsed = docs[0].storageUsed;
        if (storageMax < storageUsed + file.size)
          return res.status(401).json({ errorCode: 10, data: null });
        const createData = {
          name: file.name,
          idFolder: req.query.idFolder == 0 ? 0 : req.query.idFolder,
          type: file.mimetype,
          size: file.size,
          shared: false,
          createdBy: userId,
          createdDate: date,
          lastModifiedBy: 0,
          lastModifiedDate: 0,
          deletedBy: 0,
          deletedDate: 0,
        };

        col.insert(createData, function (err, r) {
          assert.equal(null, err);
          file.mv(
            `./../back_end/public/upload/${
              createData._id +
              file.name.substring(file.name.lastIndexOf("."), file.name.length)
            }`,
            (err) => {
              if (err)
                return res.status(500).json({ errorCode: 11, data: null });
              db.collection("tenant")
                .find({ createdBy: objectId(userId) })
                .toArray(function (err, docs) {
                  assert.equal(null, err);
                  const storageUsed = docs[0].storageUsed;
                  db.collection("tenant").findOneAndUpdate(
                    { createdBy: objectId(userId) },
                    { $set: { storageUsed: storageUsed + file.size } },
                    { upsert: false },
                    function (err, r) {
                      assert.equal(null, err);
                    }
                  );

                  res.json({ errorCode: null, data: true });
                });
            }
          );
        });
      });
  });
});
router.post("/rename", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  //console.log(new Date());
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");

    // Modify and return the modified document
    col.findOneAndUpdate(
      { _id: objectId(req.body.id) },
      {
        $set: {
          name: req.body.name,
          lastModifiedBy: req.userId,
          lastModifiedDate: date,
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
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Remove and return a document
    const userId = req.body.userId == 0 ? req.userId : req.body.userId;

    col.findOneAndUpdate(
      { _id: objectId(req.body.id) },
      { $set: { deletedBy: userId, deletedDate: date } },
      { upsert: false },
      function (err, r) {
        assert.equal(null, err);
        db.collection("file")
          .find({ _id: objectId(req.body.id) })
          .toArray(function (err, docs) {
            const size = docs[0].size;
            db.collection("tenant")
              .find({ createdBy: objectId(userId) })
              .toArray(function (err, docs) {
                assert.equal(null, err);
                const storageUsed = docs[0].storageUsed;
                db.collection("tenant").findOneAndUpdate(
                  { createdBy: objectId(userId) },
                  { $set: { storageUsed: storageUsed - size } },
                  { upsert: false },
                  function (err, r) {
                    assert.equal(null, err);
                    res.json({ errorCode: null, data: true });
                  }
                );
              });
          });
      }
    );
  });
});
module.exports = router;
