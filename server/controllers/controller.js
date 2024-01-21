const jwt = require("jsonwebtoken");
const SubTask = require("../models/SubTask");
const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const newTask = await Task.create({
      title,
      description,
      due_date,
    });

    const token = jwt.sign({ id: newTask._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });

    res.status(200).json({ task: newTask, token });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createSubTask = async (req, res) => {
  try {
    const { task_id } = req.body;
    const task = Task.findById(task_id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    } else {
      const newSubTask = new SubTask({
        task_id: req.userId,
      });
      const saveSubTask = await newSubTask.save();

      res.status(200).json(saveSubTask);
    }
  } catch (error) {
    console.error("Error creating Sub-task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserTask = async (req, res) => {
  try {
    const existingTask=await Task.find({});
  
    res.status(200).json(existingTask);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserSubTask = async (req, res) => {
  try {
    const data = await SubTask.find({ task_id: req.userId });

    if (!data) return res.status(400).json({ error: "task_id is undefined" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const existingTask = await Task.findById(req.userId);

    const { due_date, status } = req.body;

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          due_date: due_date,
          status: status,
        },
      },
      { new: true }
    );

    await updatedTask.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSubTask = async (req, res) => {
  try {
    const existingSubTask = await SubTask.findOne({ task_id: req.userId });

    const { status } = req.body;

    if (!existingSubTask) {
      return res.status(404).json({ error: "SubTask not found" });
    }

    existingSubTask.status = status;

    const newSubTask = await existingSubTask.save();

    return res.status(200).json(newSubTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = await Task.find({ _id: req.userId });
    console.log(id);

    const delTask = await Task.findByIdAndUpdate(
      id,
      { $set: { deleted_at: new Date() } },
      { new: true }
    );

    if (!delTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSubTask = async (req, res) => {
  try {
    const id = await SubTask.find({ task_id: req.userId });

    const delSubTask = await SubTask.findByIdAndUpdate(
      id,
      { $set: { deleted_at: new Date() } },
      { new: true }
    );

    if (!delSubTask) {
      return res.status(404).json({ error: "Sub-Task not found" });
    }

    res.status(200).json({ message: "Sub-Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  createSubTask,
  getUserTask,
  getUserSubTask,
  updateTask,
  updateSubTask,
  deleteTask,
  deleteSubTask,
};
