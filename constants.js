const SQL_FETCH_FLOW_PRESSURE =
  "SELECT id, timeStamp, flow, pressure FROM Aquasight.FlowPressureData";
const SQL_INSERT_FLOW_PRESSURE =
  "INSERT INTO Aquasight.FlowPressureData (flow, pressure) VALUES (?, ?)";
const SQL_FETCH_USERNAME = "SELECT username FROM Aquasight.Users";

const RESPONSE_CODE_200 = "The request succeeded.";
const RESPONSE_CODE_400 = "Bad request.";
const RESPONSE_CODE_404 = "Requested resource not found.";
const RESPONSE_CODE_500 = "Internal sever error";
const DATABASE_FETCH_ERROR =
  "An issue occurred while fetching data from the database.";
const DATABASE_INSERT_ERROR =
  "An issue occurred while inserting data in the database.";
const DATABASE_CONNECT_ERROR =
  "An issue occurred while connecting to the database.";
  const DATABASE_CONNECT_SUCCESS =
  "Successfully connected to the database.";


const sqlStatements = {
  SQL_FETCH_FLOW_PRESSURE,
  SQL_INSERT_FLOW_PRESSURE,
  SQL_FETCH_USERNAME,
};

const errorCodeDescriptions = {
  RESPONSE_CODE_200,
  RESPONSE_CODE_400,
  RESPONSE_CODE_404,
  RESPONSE_CODE_500,
  DATABASE_FETCH_ERROR,
  DATABASE_INSERT_ERROR,
  DATABASE_CONNECT_ERROR,
  DATABASE_CONNECT_SUCCESS
};

module.exports = { sqlStatements, errorCodeDescriptions };
