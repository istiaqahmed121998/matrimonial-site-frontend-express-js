require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      indexes: [{ unique: true, fields: ["email"] }],
    },

    number: { type: DataTypes.STRING, unique: true, allowNull: false },
    dateofbirth: { type: DataTypes.DATEONLY, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    onbehalf: { type: DataTypes.STRING },
    lookingfor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["hash", "salt"],
      },
    },
  }
);

module.exports = User;
