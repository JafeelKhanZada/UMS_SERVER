const express = require("express");
const router = express.Router();
const AcademicRecordStudent = require("../../../controllers/Academic Record Student");
const Controller = new AcademicRecordStudent();
router.post("/insert", Controller.InsertData);
router.post("/getData", Controller.GetData);
router.post("/update/:id", Controller.UpdateData);
router.post("/delete", Controller.DeleteData);
module.exports = router;
