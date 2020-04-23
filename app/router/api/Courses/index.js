const express= require("express");
const router=express.Router();
const Courses= require("../../../controllers/Courses");
const Controller =new Courses();
router.post("/InsertCourse",Controller.InsertCourse);
router.post("/GetCourse",Controller.GetCourse);
router.post("/DeleteCourse",Controller.DeleteCourse);
router.post("/UpdateCourse/:id",Controller.UpdateCourse);
module.exports=router;