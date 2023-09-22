import mongoose from "mongoose";

const projectModel = new mongoose.Schema({
  id: String,
  projectName: String,
  frontend: String,
  backend: String,
  projectDescription: String,
  startDate: Date,
  endDate: Date,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskData" }],
  projectMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});

export const ProjectData =
  mongoose.models.projects || mongoose.model("projects", projectModel);

//    hear projects is name of coolection which defined in mongodb
