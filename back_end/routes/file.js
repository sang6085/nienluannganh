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
router.get("/download", function (req, res, next) {
  res.download("./../back_end/public/upload/2.jpg", "4.jpg");
  // Use connect method to connect to the Server
  //   const {page, pageSize, search, parentId}=req.query;
  //   MongoClient.connect(url, function (err, client) {
  //     assert.equal(null, err);
  //     const db = client.db(dbName);
  //     const col = db.collection("file");
  //     // Get first two documents that match the query
  //     let totalCount=0;
  //     col.find({createdBy: req.userId, deletedBy: 0, parentId: parentId==0? Number(parentId): parentId, createdDate: "16/08/2021"}).toArray(function (err, docs) {
  //       assert.equal(null, err);
  //       // console.log(docs.length);
  //       totalCount=docs.length;
  //     });

  //     col.find({name: {$regex: search?search.trim():'', $options: 'i'}, createdBy: req.userId, deletedBy: 0, parentId: parentId==0? Number(parentId): parentId, createdDate: "16/08/2021"}).limit(Number(pageSize)).skip(Number(pageSize*page)).toArray(function (err, docs) {
  //       assert.equal(null, err);
  //       // console.log(docs.length);
  //       const data=docs.map((item)=>{
  //         return {id: item._id, name: item.name}
  //       })
  //       res.json({errCode: null, errMessage: null, data: {totalCount, listData: data}});
  //       client.close();
  //     });
  //   });
});
/* GET home page. */
router.get("/select_list", verifyToken, function (req, res, next) {
  // Use connect method to connect to the Server
  const { page, pageSize, search, parentId } = req.query;
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Get first two documents that match the query
    let totalCount = 0;
    col
      .find({
        createdBy: req.userId,
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
        createdBy: req.userId,
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
          };
        });
        res.json({ errorCode: null, data: { totalCount, listData: data } });
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
  //console.log(new Date());
  const file = req.files.file;
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");

    const createData = {
      name: file.name,
      idFolder: req.query.idFolder == 0 ? 0 : req.query.idFolder,
      type: file.mimetype,
      size: file.size,
      createdBy: req.userId,
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
          if (err) return res.sendStatus(500);
          res.json({ errorCode: null, data: true });
        }
      );
    });

    //   else {
    //     // Modify and return the modified document
    // col.findOneAndUpdate({_id: objectId(req.body.id)}, {$set: {name: req.body.name, lastModifiedBy: req.userId, lastModifiedDate: date}}, {upsert: false
    // }, function(err, r) {
    //   assert.equal(null, err);
    //   })
    //   res.json({errCode: null, errMessage: null, data: true});
    // }
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
router.delete("/:id", verifyToken, function (req, res, next) {
  //Use connect method to connect to the Server
  var date = new Date().toLocaleDateString("en-GB");
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("file");
    // Remove and return a document

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
