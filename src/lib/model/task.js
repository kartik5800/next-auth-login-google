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
    type: String,
  },
  status: {
    type: String,
  },
  lastUpdatedDate: {
    type: Date,
    // default: Date.now,
  },
  taskId: {
    type: Number,
  },
});

taskSchema.pre("save", function (next) {
  console.log("=============================");
  this.lastUpdatedDate = Date.now();
  next();
});

export const TaskData =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);

// taskSchema.pre("save", function (next) {
//   this.lastUpdatedDate = Date.now();
//   next();
// });
