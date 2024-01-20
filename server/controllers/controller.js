const SubTask = require("../models/SubTask");
const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const newTask=new Task({
        title,
        description,
        due_date
    })

    const saveTask=await newTask.save();
    res.status(200).json(saveTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createSubTask = async (req, res) => {
    try {
        
        const {task_id}=req.body;
        const task=Task.findById(task_id);

        if(!task){
            return res.status(404).json({ error: 'Task not found' });
        }else{

            const newSubTask=new SubTask({
                task_id
            })
            const saveSubTask=await newSubTask.save();
        
            res.status(200).json(saveSubTask);
        }
    
    
    } catch (error) {
        console.error('Error creating Sub-task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    
};

const getUserTask = async (req, res) => {};
const getUserSubTask = async (req, res) => {};
const updateTask = async (req, res) => {};
const updateSubTask = async (req, res) => {};
const deleteTask = async (req, res) => {};
const deleteSubTask = async (req, res) => {};

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
