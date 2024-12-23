const mysql = require("mysql");

const db = mysql.createConnection({
  user: "k4j3hjzvjercf8h6",
  host: "z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  password: "zeen1lm0pj9r67te",
  port: "3306",
  database: "k5pjza8nvjjzocu3",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

//ปิดการเชื่อมต่อฐานข้อมูล MySQL
// db.end()

module.exports = db;
