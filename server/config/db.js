const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "biocal_system",
});

db.connect((err)=>{
    if(err){
        console.error('error connecting: '+ err.stack)
        return
    }
    console.log('connected as id ' + db.threadId)
})

//ปิดการเชื่อมต่อฐานข้อมูล MySQL 
// db.end()

module.exports = db;