const express =require("express");
const router =express.Router();
const Teacher =require("../../../controllers/Teachers");
const Controller =new Teacher();
router.post("/InsertTeacher",Controller.InsertTeacher);
router.post("/GetTeacher",Controller.GetTeacher);
router.post("/DeleteTeacher",Controller.DeleteTeacher);
router.post("/UpdateTeacher/:id",Controller.UpdateTeacher);
module.exports=router;