/**
 * File for app settings
 */
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
require("./router/router.js")(app);

module.exports = app;