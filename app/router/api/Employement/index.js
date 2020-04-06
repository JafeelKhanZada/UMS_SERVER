const express = require("express");
const router = express.Router();
const Employement = require("../../../controllers/Employement");
const Controller = new Employement();
router.post("/insert", Controller.InsertData);
router.post("/getData", Controller.GetData);
router.post("/delete", Controller.DeleteData);
router.post("/update/:id", Controller.UpdateData);
module.exports = router;
