const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');
global.appRoot = path.resolve(__dirname);
const routes = require('./routes/index.routes.js');

const PORT = process.env.PORT;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}...🚀`);
});