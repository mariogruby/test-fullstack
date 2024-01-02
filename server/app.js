require('dotenv').config();
require('./db')
const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const app = express();



// require("./config")(app);

const apiRoutes = require("./routes/api.routes");
app.use(cors());
app.use("/api", apiRoutes);

module.exports = app;