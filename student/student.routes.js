const studentController = require("../student/student.controller");
const express = require("express");
const router = express.Router();

router.post("/", studentController.create);
router.get("/", studentController.findAll);
router.get("/:id", studentController.findOne);
router.get("/search/:keyword", studentController.search);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.delete);
router.delete("/del/:id",studentController.del);
module.exports = router;
