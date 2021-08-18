const express = require("express");
let router = express.Router();
const db = require('../../config/db');

router.route("/").get((req, res) => {
  db.query(
    "SELECT COUNT(*) as countPayment FROM userproject WHERE userPayStatus ='รอการยืนยัน';",
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
