const express = require("express");
const router = express.Router();
const Lab = require("../../../controllers/Lab");
const Controller = new Lab();
router.post("/insertlab", Controller.InsertLab);
router.post("/getlab", Controller.GetLab);
router.post("/updatelab/:id", Controller.UpdateLab);
router.post("/deletelab", Controller.DeleteLab);
module.exports = router;