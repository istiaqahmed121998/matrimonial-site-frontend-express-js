require('dotenv').config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const Membership = require("./Membership");
const User = require("./User");

const User_Membership = sequelize.define(
  "User_Membership",
  {
    activation: {type:DataTypes.DATEONLY},
    expires: {type:DataTypes.DATEONLY},
  },
  { timestamps: false }
);
User.belongsToMany(Membership, { through: User_Membership });
Membership.belongsToMany(User, { through: User_Membership });

module.exports = User_Membership;
