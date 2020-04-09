const express = require("express");
const router = express.Router();
const Section =require("../../../controllers/Section");
const Controller = new Section();
router.post("/InsertSection",Controller.InsertSection);
router.post("/GetSection",Controller.GetSection);
router.post("/DeleteSection",Controller.DeleteSection);
router.post("/UpdateSection/:id",Controller.UpdateSection);
module.exports=router;