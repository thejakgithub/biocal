const express = require("express");
let router = express.Router();
const multer = require("multer");
const db = require('../../config/db');

const storageNews = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/file/news");
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
      return cb(new Error("Only .pdf format allowed!"));
    }
  } else {
    cb(null, true);
  }
};

const uploadNews = multer({ storage: storageNews, fileFilter: fileFilterPDF });

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM news ORDER BY newsID DESC", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  })
  .post(uploadNews.single("fileNews"), (req, res) => {
    const topicNews = req.body.topicNews;
    const date = req.body.date;
    const file = req.file.filename;

    db.query(
      "INSERT INTO news (newsTopic, newsDate, newsFile) VALUES(?,?,?)",
      [topicNews, date, file],
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

router.route("/:newsID").get((req, res) => {
  const newsID = req.params.newsID;
  db.query("SELECT * FROM news WHERE news.newsID = ?", newsID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}).put(uploadNews.single("fileNews"),(req,res)=>{
    const newsID = req.params.newsID;
    const topicNews = req.body.topicNews;
    const date = req.body.date;
  
    if (req.body.fileName) {
      var file = req.body.fileName;
    } else {
      var file = req.file.filename;
    }
  
    db.query(
      "UPDATE news set newsTopic = ?, newsDate = ?, newsFile = ? WHERE newsID = ? ",
      [topicNews, date, file, newsID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
          console.log(result);
        }
      }
    );
}).delete((req,res)=>{
    const newsID = req.params.newsID;

    db.query("DELETE FROM news WHERE news.newsID = ?", newsID, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
});

module.exports = router;
