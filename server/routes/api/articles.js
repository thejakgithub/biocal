const express = require("express");
let router = express.Router();
const multer = require("multer");
const db = require('../../config/db');

const storageArticle = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/file/articles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilterPDF = (req, file, cb) => {
  if (!!file) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("รองรับไฟล์ .pdf เท่านั้น !"));
    }
  } else {
    cb(null, true);
  }
};

const uploadArticle = multer({
  storage: storageArticle,
  fileFilter: fileFilterPDF,
});

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM article ORDER BY artID DESC ", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .post(uploadArticle.single("fileArt"), (req, res) => {
    const artTopic = req.body.artTopic;
    const artDate = req.body.artDate;
    const artFile = req.file.filename;

    db.query(
      "INSERT INTO article (artTopic, artDate, artFile) VALUES(?,?,?)",
      [artTopic, artDate, artFile],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Successfully Uploaded.");
          console.log(result);
        }
      }
    );
  });

router
  .route("/:artID")
  .get((req, res) => {
    const artID = req.params.artID;
    db.query(
      "SELECT * FROM article WHERE article.artID = ?",
      artID,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  })
  .put(uploadArticle.single("fileArticle"), (req, res) => {
    const artID = req.params.artID;
    const artTopic = req.body.artTopic;
    const date = req.body.date;

    if (req.body.fileName) {
      var file = req.body.fileName;
    } else {
      var file = req.file.filename;
    }

    db.query(
      "UPDATE article set artTopic = ?, artDate = ?, artFile = ? WHERE artID = ? ",
      [artTopic, date, file, artID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
  })
  .delete((req, res) => {
    const artID = req.params.artID;

    db.query(
      "DELETE FROM article WHERE article.artID = ?",
      artID,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err });
        } else {
          res.send(result);
        }
      }
    );
  });

module.exports = router;
