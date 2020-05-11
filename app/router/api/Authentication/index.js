const express = require("express");
const router = express.Router();
const Authentication = require("../../../controllers/Auth/");
const Controller = new Authentication();
router.post("/login", Controller.Login);
module.exports = router;
