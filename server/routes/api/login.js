const express = require("express");
let router = express.Router();
const db = require('../../config/db');

router
  .route("/")
  .get((req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
      db.query(
        "SELECT * FROM member WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              req.session.user = username;
              res.send(result);
            } else {
              res.send({ message: "Incorrect Username or Password!" });
            }
          }
        }
      );
    } else {
      res.send({ message: "Please enter Username and Password" });
    }
  });

module.exports = router;
