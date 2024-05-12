const { sqlStatements, errorCodeDescriptions } = require("../constants.js");
const db = require("../mysql.js");

// POST Method - Insert data into Aquasight.FlowPressureData
const addSensorData = async (req, res) => {
  try {
    const { flow, pressure } = req.body;
    //Request parameters validation. Flow and pressure are numerical and not null or string types.
    if (
      !flow ||
      !pressure ||
      isNaN(flow) ||
      isNaN(pressure) ||
      flow <= 0 ||
      pressure <= 0
    ) {
      return res
        .status(400)
        .json({ error: sqlStatements.errorCodeDescriptions.RESPONSE_CODE_400 });
    }

    const sql = sqlStatements.SQL_INSERT_FLOW_PRESSURE;
    db.query(sql, [flow, pressure], (err, result) => {
      if (err) {
        console.error(errorCodeDescriptions.DATABASE_INSERT_ERROR, err);
        return res
          .status(500)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
      }
      res
        .status(200)
        .json({ message: errorCodeDescriptions.RESPONSE_CODE_200 });
    });
  } catch (error) {
    console.error("Error in addSensorData:", error);
    res.status(500).json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
  }
};

// POST Method - Retrieve single row by ID
const getSensorDataByID = async function (req, res) {
  try {
    const id = req.body.id;
    let sql = sqlStatements.SQL_FETCH_FLOW_PRESSURE;
    let params = [];

    //Request parameters validation. Id should not be null and it should be a integer
    if (id || !isNaN(id)) {
      sql += " WHERE id = ?";
      params.push(id);
    } else {
      return res
        .status(400)
        .json({ error: errorCodeDescriptions.RESPONSE_CODE_400 });
    }

    db.query(sql, id, (err, result) => {
      if (err) {
        console.error(errorCodeDescriptions.DATABASE_FETCH_ERROR, err);
        return res
          .status(500)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_404 });
      }
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error("Error in getSensorDataByID:", error);
    res.status(500).json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
  }
};

// POST Method - Implement filtering by timestamp
const getSensorDataByTimeStamp = async function (req, res) {
  try {
    const timestamp = req.body.timestamp;
    let sql = sqlStatements.SQL_FETCH_FLOW_PRESSURE;
    let params = [];
    //Request parameters validation, Timestamp should not be null
    if (timestamp) {
      sql += " WHERE time_stamp = ?";
      params.push(timestamp);
    }
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(errorCodeDescriptions.DATABASE_FETCH_ERROR, err);
        return res
          .status(500)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error in getSensorDataByTimeStamp:", error);
    res.status(500).json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
  }
};

// GET Method - Get all records from the table
const getSensorData = async function (req, res) {
  try {
    const sql = sqlStatements.SQL_FETCH_FLOW_PRESSURE;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(errorCodeDescriptions.DATABASE_FETCH_ERROR, err);
        return res
          .status(500)
          .json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error in getSensorData:", error);
    res.status(500).json({ error: errorCodeDescriptions.RESPONSE_CODE_500 });
  }
};

module.exports = {
  addSensorData,
  getSensorData,
  getSensorDataByID,
  getSensorDataByTimeStamp,
};
