const express = require("express");
const router = express.Router();
const Enrolement = require("../../../controllers/Enrolement");
const Controller = new Enrolement();
router.post("/insertEnroll", Controller.InsertEnroll);
router.post("/getEnroll", Controller.GetEnroll);
router.post("/updateEnroll/:id", Controller.UpdateEnroll);
router.post("/deleteEnroll", Controller.DeleteEnroll);
module.exports = router;
