const express = require("express");
const router = express.Router();
const Lab = require("../../../controllers/ROLES");
const Controller = new Lab();
router.post("/insert", Controller.InsertData);
router.post("/get", Controller.GetData);
router.post("/update/:id", Controller.UpdateRoles);
router.post("/delete", Controller.UpdateRoles);
module.exports = router;
