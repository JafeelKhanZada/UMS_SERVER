const express = require("express");
const router = express.Router();
const Assessments = require("../../../controllers/Assessments");
const Controller = new Assessments();
router.post("/insertAssessments", Controller.InsertAssessments);
router.post("/getAssessments", Controller.GetAssessments);
router.post("/updateAssessments/:id", Controller.UpdateAssessments);
router.post("/deleteAssessments", Controller.DeleteAssessments);
module.exports = router;