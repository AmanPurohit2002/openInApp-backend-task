const express = require("express");
const {
  createTask,
  createSubTask,
  getUserTask,
  getUserSubTask,
  updateTask,
  updateSubTask,
  deleteTask,
  deleteSubTask,
} = require("../controllers/controller");
const router = express.Router();

router.post("/task", createTask);
router.post("/sub-task", createSubTask);
router.get("/task", getUserTask);
router.get("/sub-task", getUserSubTask);
router.put("/task", updateTask);
router.put("/sub-task", updateSubTask);
router.delete("/task", deleteTask);
router.delete("/sub-task", deleteSubTask);

module.exports = router;
