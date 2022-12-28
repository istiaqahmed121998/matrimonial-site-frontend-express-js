const User = require("../../models/User");
const { validPassword, issueJWT } = require("../../utils/util");
const getAccessToken = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.unscoped().findOne({ where: { email } });
    if (user) {
      if (validPassword(password, user.hash, user.salt)) {
        const access_token = issueJWT(user);
        res.status(200).json({
          message: `your access token`,
          access_token: access_token,
        });
      } else {
        res.status(401).json({
          message: `Password doesn't match`,
          data: null,
        });
      }
    } else {
      res.status(401).json({
        message: `User is not found`,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { getAccessToken };
