const express = require("express");
let router = express.Router();
const db = require("../../config/db");

router.route("/").get((req, res) => {
  if (res) {
    res.clearCookie("userId");
    res.send("cookie userId cleared");
  }
});

module.exports = router;
