const express= require("express");
const router =express.Router();
const Employe_Experience=require("../../../controllers/Employe_Experience");
const Controller=new Employe_Experience();
router.post("/insertExperience",Controller.InsertExperience);
router.post("/getExperience",Controller.GetExperience);
router.post("/deleteExperience",Controller.DeleteExperience);
router.post("/updateExperience/:id",Controller.UpdateExperience);
module.exports=router;