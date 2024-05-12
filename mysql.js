const mysql = require("mysql");
const { errorCodeDescriptions } = require("./constants");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "aquasight",
});
try {
  db.connect((err) => {
    if (err) {
      console.error(errorCodeDescriptions.DATABASE_CONNECT_ERROR, err);
      return null;
    }
    console.log(errorCodeDescriptions.DATABASE_CONNECT_SUCCESS);
  });
} catch (error) {
  console.log("Error in mysql.js", err);
}

module.exports = db;
