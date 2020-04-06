const express = require("express");
const router = express.Router();
const Fees = require("../../../controllers/Fees");
const Controller = new Fees();
router.post("/insert", Controller.InsertData);
router.post("/getData", Controller.GetData);
router.post("/update/:id", Controller.UpdateData);
router.post("/delete", Controller.DeleteData);
module.exports = router;
