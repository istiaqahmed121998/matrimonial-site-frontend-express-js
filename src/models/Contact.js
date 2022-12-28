require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const Contact = sequelize.define(
  "contacts",

  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    
    office_address: { type: DataTypes.TEXT },
    phonenumber: { type: DataTypes.TEXT },
    email_address: { type: DataTypes.TEXT },
    iframe: { type: DataTypes.TEXT }
  },
  { timestamps: false }
);

module.exports = Contact;
