const express = require("express");
const router = express.Router();
const Enrolled_Courses = require("../../../controllers/Enrolled_Courses");
const Controller = new Enrolled_Courses();
router.post("/insertEnrolled", Controller.InsertEnrolled);
router.post("/getEnrolled", Controller.GetEnrolled);
router.post("/updateEnrolled/:id", Controller.UpdateEnrolled);
router.post("/deleteEnrolled", Controller.DeleteEnrolled);
module.exports = router;
