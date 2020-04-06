const express = require("express");
const router = express.Router();
const Program = require("../../../controllers/PROGRAM");
const Controller = new Program();
router.post("/insert", Controller.InsertData);
router.post("/getData", Controller.GetData);
router.post("/delete", Controller.DeleteProgram);
router.post("/update/:id", Controller.UpdateProgram);
module.exports = router;
