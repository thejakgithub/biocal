const express = require("express");
let router = express.Router();
const db = require('../../config/db');

router.route("/").get((req, res) => {
  db.query(
    "SELECT * FROM article ORDER BY artID DESC LIMIT 0,4",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
