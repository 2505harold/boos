const mysql = require("mysql");
const { promisify } = require("util");
const { dbMySQLonline } = require("./keys");

const pool = mysql.createPool(dbMySQLonline);

pool.getConnection((err, conn) => {
  if (err) {
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed");
    }
    if (err.code == "ER_CON_COUNTER_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code == "ER_CON_COUNTER_ERROR") {
      console.error("Database has to many connections");
    }
  }

  if (conn) conn.release();
  console.log("Database is connected");
  return;
});

//promisy pool query
pool.query = promisify(pool.query);

module.exports = pool;
