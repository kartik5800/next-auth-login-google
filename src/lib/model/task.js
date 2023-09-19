import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectData",
  },
  taskName: {
    type: String,
  },
});

export const TaskData =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);
