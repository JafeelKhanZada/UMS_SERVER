const express = require("express");
const router = express.Router();
const Lab = require("../../../controllers/Miscelenous");
const Controller = new Lab();
router.get("/getAdminDashboard", Controller.getCardSuperAdmin);
module.exports = router;
