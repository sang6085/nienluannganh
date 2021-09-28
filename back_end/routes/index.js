var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const objectId = require("mongodb").ObjectId;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Names
const dbName = "fileManager";
router.use(express.json());
/* GET home page. */
const account = require("./account");
const category = require("./category");
const license = require("./license");
const folder = require("./folder");
const tenant = require("./tenant");
const file = require("./file");
router.use(express.json());
router.use("/api/v3/account", account);
router.use("/api/v3/category", category);
router.use("/api/v3/license", license);
router.use("/api/v3/folder", folder);
router.use("/api/v3/tenant", tenant);
router.use("/api/v3/file", file);
/* GET home page. */
var schedule = require("node-schedule");
schedule.scheduleJob({ hour: 0, minute: 33 }, function () {
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const col = db.collection("tenant");
    // Modify and return the modified document
    db.collection("license")
      .find({ _id: objectId("611ab02ceefd13f51b911494") })
      .toArray(function (err, docs) {
        const storageMax = docs[0].storageSize;
        const licenseName = docs[0].name;
        col.find({ deletedBy: 0 }).toArray(function (err, docs) {
          //assert.equal(null, err);
          var dateNow = new Date().toLocaleDateString("en-GB");
          const str = dateNow.split("/");
          const date = new Date(str[2], str[1], str[0]);
          docs.map((item) => {
            const arrDate = item.expiredDate;
            const strtmp = arrDate.split("/");
            const datetmp = new Date(strtmp[2], strtmp[1], strtmp[0]);
            const expiredDate = new Date(datetmp);
            if (date >= expiredDate) {
              col.findOneAndUpdate(
                { deletedBy: 0, expiredDate: arrDate },
                {
                  $set: {
                    licenseName: licenseName,
                    licenseId: "611ab02ceefd13f51b911494",
                    storageMax: storageMax,
                    expiredDate: dateNow,
                    lastModifiedBy: "6127bcdd9373c90ecd8f5172",
                    lastModifiedDate: dateNow,
                  },
                },
                { upsert: false },
                function (err, r) {
                  assert.equal(null, err);
                }
              );
            }
          });
        });
      });
  });
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
