import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectData",
  },
  taskName: {
    type: String,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  status: {
    type: String,
  },
  lastUpdatedDate: {
    type: Date,
  },
  taskId: {
    type: Number,
  },
  priority: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  estimatedTime: {
    type: String,
  },
  done: {
    type: Number,
  },
});

taskSchema.pre("save", function (next) {
  this.lastUpdatedDate = Date.now();
  next();
});

export const TaskData =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);
