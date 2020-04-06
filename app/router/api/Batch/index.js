const express = require("express");
const router = express.Router();
const Batch = require("../../../controllers/Batch");
const Controller = new Batch();
router.post("/insert", Controller.InsertBatch);
router.post("/getBatch", Controller.GetBatch);
router.post("/update/:id", Controller.UpdateBatch);
router.post("/delete", Controller.DeleteBatch);
module.exports = router;
