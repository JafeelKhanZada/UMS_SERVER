const express = require("express");
const router = express.Router();
const Assessment_type = require("../../../controllers/Asssessment_type");
const Controller = new Assessment_type();
router.post("/insertAssessment", Controller.InsertAssessment);
router.post("/getAssessment", Controller.GetAssessment);
router.post("/updateAssessment/:id", Controller.UpdateAssessment);
router.post("/deleteAssessment", Controller.DeleteAssessment);
module.exports = router;