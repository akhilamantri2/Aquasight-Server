const { sqlStatements, errorCodeDescriptions } = require("../constants.js");
const db = require("../mysql.js");

const login = async function (req, res) {
  try {
    const { username, password } = req.body;

    let sql = sqlStatements.SQL_FETCH_USERNAME;
    let params = [];

    //Request parameters validation. Check for null and integer type for the ID.
    if (username) {
      sql += " WHERE username = ?";
      params.push(username);
    } else {
      return res
        .status(400)
        .json({ error: errorCodeDescriptions.RESPONSE_CODE_400 });
    }
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        return res
          .status(500)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
      }

      // Check if any matching user is found
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_404 });
      }
      //If user is found, then check for password match.
      //Request parameters validation. Check for null for password.
      if (password) {
        params.push(password);
      } else {
        return res
          .status(400)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_400 });
      }
      sql += "AND password = ?";
      db.query(sql, params, (err, result) => {
        if (err) {
          console.error(errorCodeDescriptions.DATABASE_FETCH_ERROR, err);
          return res
            .status(500)
            .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
        }

        // Check if any matching user is found
        if (result.length === 0) {
          return res
            .status(404)
            .json({ error: errorCodeDescriptions.RESPONSE_CODE_404 });
        }

        // If user exists, return success response with only username without exposing password
        res.status(200).json({
          message: errorCodeDescriptions.RESPONSE_CODE_200,
          data: result[0].username,
        });
      });
    });
  } catch (error) {
    console.error("Error in login module:", error);
    res.status(500).json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
  }
};

module.exports = {
  login,
};
