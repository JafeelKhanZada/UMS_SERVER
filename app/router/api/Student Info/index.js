const express = require("express");
const router = express.Router();
const StudentInfo = require("../../../controllers/Student Info");
const Controller = new StudentInfo();
router.post("/insert", Controller.InsertData);
router.post("/update/:id", Controller.UpdateData);
router.post("/delete", Controller.DeleteData);
router.post("/getData", Controller.GetData);
module.exports = router;
