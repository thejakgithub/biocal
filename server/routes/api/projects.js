const express = require("express");
let router = express.Router();
const multer = require("multer");
const db = require('../../config/db');

const storageProject = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/file/projects");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProject = multer({ storage: storageProject });

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM project ORDER BY pjID DESC", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .post(
    uploadProject.fields([
      { name: "fileDes", maxCount: 1 },
      { name: "fileReply", maxCount: 1 },
      { name: "fileSchedule", maxCount: 1 },
    ]),
    (req, res) => {
      const projectName = req.body.projectName;
      const projectStart = req.body.projectStart;
      const projectEnd = req.body.projectEnd;
      const projectPlace = req.body.projectPlace;
      const projectFee = req.body.projectFee;
      const projectReply = req.files["fileReply"][0].filename;
      const projectDes = req.files["fileDes"][0].filename;
      const projectSchedule = req.files["fileSchedule"][0].filename;

      db.query(
        "INSERT INTO project (pjName, pjStartDate, pjEndDate,pjDescription,pjPlace,pjReply,pjSchedule,pjRegisterFee) VALUES(?,?,?,?,?,?,?,?)",
        [
          projectName,
          projectStart,
          projectEnd,
          projectDes,
          projectPlace,
          projectReply,
          projectSchedule,
          projectFee,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Successfully Uploaded.");
            console.log(result);
          }
        }
      );
    }
  );

router
  .route("/:pjID")
  .get((req, res) => {
    const pjID = req.params.pjID;
    db.query("SELECT * FROM project WHERE pjID = ?", pjID, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .put(
    uploadProject.fields([
      { name: "fileDes", maxCount: 1 },
      { name: "fileReply", maxCount: 1 },
      { name: "fileSchedule", maxCount: 1 },
    ]),
    (req, res) => {
      const pjID = req.params.pjID;
      const projectName = req.body.projectName;
      const projectStart = req.body.projectStart;
      const projectEnd = req.body.projectEnd;
      const projectPlace = req.body.projectPlace;
      const projectFee = req.body.projectFee;

      if (req.body.projectDes) {
        var projectDes = req.body.projectDes;
      } else {
        var projectDes = req.files["fileDes"][0].filename;
      }
      if (req.body.projectReply) {
        var projectReply = req.body.projectReply;
      } else {
        var projectReply = req.files["fileReply"][0].filename;
      }
      if (req.body.projectSchedule) {
        var projectSchedule = req.body.projectSchedule;
      } else {
        var projectSchedule = req.files["fileSchedule"][0].filename;
      }
      db.query(
        "UPDATE project set pjName = ?, pjStartDate = ?, pjEndDate = ?,pjDescription = ?,pjPlace = ?,pjReply = ?,pjSchedule = ?,pjRegisterFee= ? WHERE pjID = ? ",
        [
          projectName,
          projectStart,
          projectEnd,
          projectDes,
          projectPlace,
          projectReply,
          projectSchedule,
          projectFee,
          pjID,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
            console.log(result);
          }
        }
      );
    }
  ).delete((req,res)=>{
    const pjID = req.params.pjID;

    db.query("DELETE FROM project WHERE pjID = ?", pjID, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  });

module.exports = router;
