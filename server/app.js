require('dotenv').config();
require('./db')
const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const app = express();
app.use(express.json());
app.use(cors());


// require("./config")(app);

const apiRoutes = require("./routes/api.routes");
app.use("/api", apiRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const bindingsRoutes = require("./routes/bindings.routes");
app.use("/bindings", bindingsRoutes);

const bootsRoutes = require("./routes/boots.routes");
app.use("/boots", bootsRoutes);

module.exports = app;