const express = require("express");
const router = express.Router();
const EmployementExperience = require("../../../controllers/Employement Experience");
const Controller = new EmployementExperience();
router.post("/getData", Controller.getData);
module.exports = router;
