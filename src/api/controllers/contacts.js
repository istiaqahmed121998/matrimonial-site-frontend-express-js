const Contact = require("../../models/Contact");
const createContact = async (req, res, next) => {
  
  const { office_address, phonenumber, email_address, iframe } = req.body;
  const contact = Contact.create({
    office_address,
    phonenumber,
    email_address,
    iframe,
  });
  res.status(200).json({
    message: `Contact is created`,
    data: contact,
  });
};
const getContacts = async (req, res, next) => {
  const contacts = await Contact.findAll();
  res.status(200).json({
    message: `get all contacts info`,
    data: contacts,
  });
};
module.exports = { createContact, getContacts };
