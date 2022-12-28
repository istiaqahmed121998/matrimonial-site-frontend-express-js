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
      indexes: [{ unique: true, fields: ["email"] }],
    },

    number: { type: DataTypes.STRING, unique: true },
    dateofbirth: { type: DataTypes.DATEONLY },
    hash: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    onbehalf: { type: DataTypes.STRING },
    lookingfor: {
      type: DataTypes.ENUM({
        values: ["Groom", "Bride"],
      }),
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["hash","salt"],
      },
    },
  }
);

module.exports = User;
