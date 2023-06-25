const {
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  login,
} = require("../controllers/studentController");

const router = require("express").Router();

router.post("/login", login);
router.post("/student", createStudent);
router.get("/student", getAllStudent);
router.get("/student/:eid", getStudentById);
router.put("/student/:eid", updateStudentById);
router.delete("/student/:eid", deleteStudentById);

module.exports = router;
