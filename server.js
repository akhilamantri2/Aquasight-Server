// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const sensorRoutes = require('./routes/sensorRoutes.js');

// Initialize Express app
const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/sensor' , sensorRoutes)
app.use('/user' , userRoutes)

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
