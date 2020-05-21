const express = require("express");
const router = express.Router();
const Samester = require("../../../controllers/Samester");
const Controller = new Samester();
router.post("/insertSamester", Controller.InsertSamester);
router.post("/getSamester", Controller.GetSamester);
router.post("/updateSamester/:id", Controller.UpdateSamester);
router.post("/deleteSamester", Controller.DeleteSamester);
router.post("/getSemesterByBatchID", Controller.getSemesterByBatchID);
module.exports = router;
