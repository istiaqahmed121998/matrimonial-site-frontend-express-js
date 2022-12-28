const User = require("../../models/User");
const { genPassword } = require("../../utils/util");
const createUser = async (req, res, next) => {
  const {
    regName: name,
    regEmail: email,
    regPassword: password,
    regConPassword: confirmpassword,
    iAm: onbehalf,
    DOB: dateofbirth,
    lookingFor: lookingfor,
    number: number,
  } = req.body;
  if (confirmpassword !== password) {
    res.status(403).json({
      error: `Password doesn't match`,
    });
  }
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    const { salt, hash } = genPassword(password);
    try {
      const user = await User.create({
        name,
        email,
        salt,
        hash,
        onbehalf,
        lookingfor,
        onbehalf,
        dateofbirth,
        number,
      });
      res.status(200).json({
        message: `User is saved`,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(409).json({
      message: `User already exist please`,
      error: "User already exist",
    });
  }
};

const getUsers = async (req, res, next) => {
  const users = await User.findAll();
  console.log(users);
  res.status(200).json({
    message: `User is saved`,
    data: users,
  });
};
module.exports = { createUser, getUsers };
