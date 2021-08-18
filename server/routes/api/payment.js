const express = require("express");
let router = express.Router();
const db = require('../../config/db');

router.route("/").get((req, res) => {
  db.query(
    "SELECT * FROM userproject,project WHERE userPayStatus = 'รอการยืนยัน' AND userproject.pjID = project.pjID",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/:pjID/:userID").put((req,res)=>{
  const pjID = req.params.pjID;
  const userID = req.params.userID;

  db.query(
    "UPDATE userproject set userPayStatus = 'ชำระแล้ว' WHERE pjID = ? AND userID = ? ",
    [pjID, userID],
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

module.exports = router;
