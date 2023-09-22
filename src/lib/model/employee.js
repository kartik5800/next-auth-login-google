import mongoose from "mongoose";

const employeeModel = new mongoose.Schema({
  name: String,
  empCode: String,
  email: String,
  designation: String,
});

export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeModel);

//    hear employees is name of coolection which defined in mongodb
