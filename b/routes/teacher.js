const {
  createTeacher,
  getAllTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
} = require("../controllers/teacherController");

const router = require("express").Router();

router.post("/teacher", createTeacher);
router.get("/teacher", getAllTeacher);
router.get("/teacher/:eid", getTeacherById);
router.put("/teacher/:eid", updateTeacherById);
router.delete("/teacher/:eid", deleteTeacherById);

module.exports = router;
