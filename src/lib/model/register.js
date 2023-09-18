const { default: mongoose } = require("mongoose");

const ragisterModel = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
});

export const RagisterData =
  mongoose.models.users || mongoose.model("users", ragisterModel);

//    hear users is name of coolection which defined in mongodb
