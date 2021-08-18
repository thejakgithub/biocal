const express = require("express");
let router = express.Router();
const multer = require("multer");
const db = require('../../config/db');


const storageReceipt = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/file/receipts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadUserProject = multer({ storage: storageReceipt });

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM userproject ORDER BY userID DESC ,pjID", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .post(uploadUserProject.single("userReceipt"), (req, res) => {
    const pjID = req.body.pjID;
    const userPrefix = req.body.userPrefix;
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const userDepartment = req.body.userDepartment;
    const userEmail = req.body.userEmail;
    const userTel = req.body.userTel;
    const userMealType = req.body.userMealType;
    const userBillAddress = req.body.userBillAddress;
    const userPayDate = req.body.userPayDate;
    const userPayStatus = req.body.userPayStatus;

    if (req.file) {
      var userReceipt = req.file.filename;
    } else {
      var userReceipt = req.body.userReceipt;
    }

    db.query(
      "INSERT INTO userproject (pjID,userPrefix, userFirstName, userLastName,userDepartment,userEmail,userTel,userMealType,userBillAddress,userPayDate,userPayStatus,userReceipt) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        pjID,
        userPrefix,
        userFirstName,
        userLastName,
        userDepartment,
        userEmail,
        userTel,
        userMealType,
        userBillAddress,
        userPayDate,
        userPayStatus,
        userReceipt,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully Payment.");
          console.log(result);
        }
      }
    );
  });

router.route("/:pjID").get((req, res) => {
  const pjID = req.params.pjID;
  db.query("SELECT * FROM userproject WHERE pjID = ?", pjID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router
  .route("/:pjID/:userID")
  .get((req, res) => {
    const pjID = req.params.pjID;
    const userID = req.params.userID;
    db.query(
      "SELECT * FROM userproject WHERE pjID = ? AND userID = ?",
      [pjID, userID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  })
  .put(uploadUserProject.single("userReceipt"), (req, res) => {
    const pjID = req.params.pjID;
    const userID = req.params.userID;
    const userPrefix = req.body.userPrefix;
    const userFirstName = req.body.userFirstName;
    const userLastName = req.body.userLastName;
    const userDepartment = req.body.userDepartment;
    const userEmail = req.body.userEmail;
    const userTel = req.body.userTel;
    const userMealType = req.body.userMealType;
    const userBillAddress = req.body.userBillAddress;
    const userPayDate = req.body.userPayDate;
    const userPayStatus = req.body.userPayStatus;

    if (req.file) {
      var userReceipt = req.file.filename;
    } else {
      var userReceipt = req.body.userReceipt;
    }

    db.query(
      "UPDATE userproject SET userPrefix = ?, userFirstName = ?, userLastName= ?,userDepartment = ?,\
       userEmail = ?,userTel = ?,userMealType = ?,userBillAddress = ?,userPayDate = ?,userPayStatus = ?,userReceipt = ? \
       WHERE pjID = ? AND userID = ? ",
      [
        userPrefix,
        userFirstName,
        userLastName,
        userDepartment,
        userEmail,
        userTel,
        userMealType,
        userBillAddress,
        userPayDate,
        userPayStatus,
        userReceipt,
        pjID,
        userID,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Updated User.");
          console.log(result);
        }
      }
    );
  })
  .delete((req, res) => {
    const pjID = req.params.pjID;
    const userID = req.params.userID;

    db.query(
      "DELETE FROM userproject WHERE pjID = ? AND userID = ?",
      [pjID, userID],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });

module.exports = router;
