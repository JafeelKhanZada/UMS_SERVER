const express = require("express");
const router =express.Router();
const Attendance = require("../../../controllers/Attendance");
const Controller = new Attendance();
router.post('/InsertAttendance',Controller.InsertAttendance);
router.post('/GetAttendance',Controller.GetAttendance);
router.post('/DeleteAttendance',Controller.DeleteAttendance);
router.post('/UpdateAttendance',Controller.UpdateAttendance);
module.exports=router;