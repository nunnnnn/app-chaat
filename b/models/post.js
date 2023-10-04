const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  attach_link: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    required: true,
  },
  create_at: {
    type: String,
    required: true,
  },
  teacher_id: {
    type:  mongoose.Types.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("Post", PostSchema);
