const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../configs/token");
const sequelize = require('../configs/db')
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}
function issueJWT(user) {
  const expiresIn = "1d";

  const payload = {
    user: {
      id: user.id,
      name:user.name
    },
  };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: expiresIn });
}
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.params.number);
    const limit = parseInt(req.params.limit);
    // console.log(req);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find()
        .populate(
          "author tags categories",
          "-phone -active -hash -salt -created -role -__v"
        )
        .populate({
          path: "comments",
          populate: {
            path: "commenter",
            model: "user",
            select: { hash: 0, salt: 0, role: 0, active: 0, created: 0 },
          },
          //
        })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

const migration=async()=>{
  
    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: true, force: false });
    }
    if (process.env.NODE_ENV === "production") {
      await sequelize.sync({ alter: false, force: false });
    }

}
module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.paginatedResults = paginatedResults;
module.exports.migration = migration;
