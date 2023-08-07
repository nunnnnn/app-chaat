const Student = require("../models/student");
const Teacher = require("../models/teacher");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    var user = await Student.findOne({ email });
    if (!user) {
      user = await Teacher.findOne({ email });
      if (!user) {
        return res.json({ msg: "Email not found", status: false });
      }
    }
    const isPasswordValid = await bcrypt.compare(
      String(password),
      String(user.password)
    );
    if (!isPasswordValid) {
      return res.json({ msg: "Invalid Password", status: false });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.createStudent = async (req, res, next) => {
  try {
    const { surname, lastname, branch, school, email, avatar, password } =
      req.body;
    const user = await Student.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: "Email already exists", status: false });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Student.create({
        name: `${surname} ${lastname}`,
        branch,
        school,
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

module.exports.getAllStudent = async (req, res, next) => {
  try {
    const result = await Student.find();
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getStudentById = async (req, res, next) => {
  try {
    const result = await Student.findOne({ _id: req.params.eid });
    return res.json(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports.updateStudentById = async (req, res, next) => {
  try {
    const { surname, lastname, branch, avatar ,school} = req.body;
    await Student.updateOne(
      { _id: req.params.eid },
      {
        name: `${surname} ${lastname}`,
        branch,
        avatar,
        school,
      }
    );
    return res.json({ status: 200, msg: "Update success!" });
  } catch (ex) {
    next(ex);
  }
};
module.exports.deleteStudentById = async (req, res, next) => {
  try {
    await Student.remove({ _id: req.params.eid });
    return res.json({ status: 200, msg: "Delete success!" });
  } catch (ex) {
    next(ex);
  }
};
