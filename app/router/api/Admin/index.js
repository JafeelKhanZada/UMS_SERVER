const express = require("express");
const router = express.Router();
const Lab = require("../../../controllers/Admin");
const Controller = new Lab();
router.post("/insert", Controller.InsertData);
router.post("/get", Controller.GetData);
router.post("/update/:id", Controller.DeleteRoles);
router.post("/delete", Controller.UpdateRoles);
module.exports = router;
