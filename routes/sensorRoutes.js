const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.js");

//3 post, 1 get
router.post("/add-data", sensorController.addSensorData);
router.post("/fetch-by-id", sensorController.getSensorDataByID);
router.get("/fetch-all", sensorController.getSensorData);
router.post("/fetch-by-timestamp", sensorController.getSensorDataByTimeStamp);

module.exports = router;
