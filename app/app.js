const express = require("express");
const middleware = require("./middleware/");
const PORT = process.env.PORT || 4000;
const app = express();
const API = require("./router/api");
middleware(app);
API(app);
app.get("/", (req, res, next) => {
  // jwt.verify(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiU1RVREVOVF9JRCI6NywiVE9UQUxfQ09VUlNFUyI6MTAsIlRPVEFMX0NSRURJVF9IT1VSUyI6MTAsIkNHUEEiOjEsIkNVUlJFTlRfU0VNRVNURVIiOjEsIlBBU1NXT1JEIjoiJDJhJDEwJGJ1aklFZ3hWMjJoVmNVdGZELnlwcmVGOXlTMGt0UE9pOWJzS2lab1NZVm52VzAubFZWZ2ptIiwiaWF0IjoxNTg1NTk4NDk1LCJleHAiOjE1ODU2MDIwOTV9.THNRMm2V2-nf_X7O1IPSiROAJWcCP5VC46m7wzQtiFM",
  //   process.env.secret,
  //   (err, decode) => {
  //     if (err) {
  //       res.json({
  //         error: true,
  //         message: "Error in decoding",
  //         data: err,
  //       });
  //     } else {
  //       res.json({
  //         error: false,
  //         message: "Token Decrypted Successfully!",
  //         data: decode,
  //       });
  //     }
  //   }
  // );
  res.send("Working");
  next();
});
app.listen(PORT, (req, res, next) => {
  console.log(`APP IS WORKING ON PORT # ${PORT}`);
});
