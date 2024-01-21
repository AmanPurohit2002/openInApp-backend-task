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
  createUser,
  getUser,
} = require("../controllers/controller");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");


router.post('/user',createUser)
router.get('/user',getUser)
router.post("/task",authMiddleware,createTask);
router.post("/sub-task", authMiddleware,createSubTask);
router.get("/task", authMiddleware,getUserTask);
router.get("/sub-task", authMiddleware,getUserSubTask);
router.put("/task", authMiddleware,updateTask);
router.put("/sub-task", authMiddleware,updateSubTask);
router.delete("/task", authMiddleware,deleteTask);
router.delete("/sub-task", authMiddleware,deleteSubTask);

module.exports = router;
