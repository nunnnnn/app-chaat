const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");

module.exports.createTeacher = async (req, res, next) => {
  try {
    const { name, email, avatar, password } = req.body;
    const user = await Teacher.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: "Email already exists", status: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Teacher.create({
        name,
        email,
        avatar,
        password: hashedPassword,
      });
      return res.status(201).json({ msg: "create success!", status: true });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllTeacher = async (req, res, next) => {
  try {
    const result = await Teacher.find();
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getTeacherById = async (req, res, next) => {
  try {
    const result = await Teacher.findOne({ _id: req.params.eid });
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateTeacherById = async (req, res, next) => {
  try {
    const { surname, lastname, avatar } = req.body;
    await Teacher.updateOne(
      { _id: req.params.eid },
      {
        name: `${surname} ${lastname}`,
        avatar,
        
      }
    );
    return res.json({ status: 200, msg: "Update success!" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteTeacherById = async (req, res, next) => {
  try {
    await Teacher.remove({ _id: req.params.eid });
    return res.json({ status: 200, msg: "Delete success!" });
  } catch (ex) {
    next(ex);
  }
};
