const Post = require("../models/post");

module.exports.createPost = async (req, res, next) => {
  try {
    const { image, title, branch, attach_link, detail, create_at, teacher_id } =
      req.body;
    await Post.create({
      image,
      title,
      branch,
      attach_link,
      detail,
      create_at,
      teacher_id,
    });
    return res.json({ msg: "create success!", status: true });
  } catch (ex) {
    next(ex);
  }
};
module.exports.getAllPost = async (req, res, next) => {
  try {
    const result = await Post.find();
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getPostById = async (req, res, next) => {
  try {
    const result = await Post.findById({_id: req.params.eid});
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.updatePostById = async (req, res, next) => {
  try {
    const { title, detail, attach_link } = req.body;
    await Post.updateOne(
      { _id: req.params.eid },
      {
        title,
        detail,
        attach_link,
      }
    );
    return res.json({ status: 200, msg: "Update success!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deletePostById = async (req, res, next) => {
  try {
    await Post.remove({ _id: req.params.eid });
    return res.json({ status: 200, msg: "Delete success!" });
  } catch (ex) {
    next(ex);
  }
};
