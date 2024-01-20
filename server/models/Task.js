const { models, model, Schema } = require("mongoose");

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date },
  priority: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  deleted_at: { type: Date },
},{timestamps:true});

const Task = models.Task || model("Task", TaskSchema);

module.exports = Task;
