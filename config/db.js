const mysql = require("mysql");

const pool = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "taskpeak",
});
pool.connect((err) => {
  if (err) throw err;
  console.log("db is connected succesfully");
});

module.exports = pool;
