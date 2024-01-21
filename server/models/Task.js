const { models, model, Schema } = require("mongoose");
const jwt=require('jsonwebtoken');

const TaskSchema = new Schema({
  id:{type:Number,required:true},
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date },
  priority: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  deleted_at: { type: Date , default:null},
},{timestamps:true});



const Task = models.Task || model("Task", TaskSchema);

module.exports = Task;
