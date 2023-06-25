const {
  createPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
} = require("../controllers/postController");

const router = require("express").Router();

router.get("/post", getAllPost);
router.post("/post", createPost);
router.get("/post/:eid", getPostById);
router.put("/post/:eid", updatePostById);
router.delete("/post/:eid", deletePostById);

module.exports = router;
