const cluster = require("cluster");
const cpu = require("os").cpus();
const path = require("path");
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
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
  app.listen(PORT, (req, res, next) => {
    console.log(`APP IS WORKING ON PORT # ${PORT}`);
  });
}
