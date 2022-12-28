require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Membership = sequelize.define("membership", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  membershiptype: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  validity: { type: DataTypes.STRING, allowNull: false },
  validation: { type: DataTypes.DATEONLY },
  accesslimit:{type: DataTypes.DECIMAL}
});

module.exports = Membership;
