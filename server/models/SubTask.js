const { models, model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const Task = require("./Task");

const SubTaskSchema = new Schema(
  {
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Task,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    deleted_at: {
      type: Date,
      default:null
    }
  },{timestamps:true}
);

const SubTask = models.SubTask || model("SubTask", SubTaskSchema);

module.exports = SubTask;
