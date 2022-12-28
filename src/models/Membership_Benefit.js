require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const Membership = require("./Membership");

const Membership_Benefit = sequelize.define(
  "membership_benefits",

  {
    benefit: { type: DataTypes.TEXT },
    has: { type: DataTypes.BOOLEAN},
  },
  { timestamps: false }
);
Membership.hasMany(Membership_Benefit);
Membership_Benefit.belongsTo(Membership);

module.exports = Membership_Benefit;
