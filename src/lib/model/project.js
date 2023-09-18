const { default: mongoose } = require("mongoose");

const projectModel = new mongoose.Schema({
  id: String,
  projectname: String,
  frontend: String,
  backend: String,
});

export const ProjectData =
  mongoose.models.projects || mongoose.model("projects", projectModel);

//    hear projects is name of coolection which defined in mongodb
