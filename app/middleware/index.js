const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
module.exports = (app) => {
  dotenv.config();
  app.use(express.static(path.join(__dirname, "/")));
  app.use(cors());
  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
};
