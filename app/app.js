const cluster = require("cluster");
const cpu = require("os").cpus();
if (cluster.isMaster) {
  for (let i = 0; i < cpu.length; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const middleware = require("./middleware/");
  const PORT = process.env.PORT || 4000;
  const app = express();
  const API = require("./router/api");
  middleware(app);
  API(app);
  app.get("/", (req, res, next) => {
    res.send("Working");
    next();
  });
  app.listen(PORT, (req, res, next) => {
    console.log(`APP IS WORKING ON PORT # ${PORT}`);
  });
}
