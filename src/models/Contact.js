require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const Contact = sequelize.define(
  "contacts",

  {
    office_address: { type: DataTypes.TEXT },
    phonenumber: { type: DataTypes.TEXT, primaryKey: true },
    email_address: { type: DataTypes.TEXT },
    iframe: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

module.exports = Contact;
