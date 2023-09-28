const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Teacher", TeacherSchema);