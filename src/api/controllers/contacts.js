const Contact = require("../../models/Contact");
const createContact = async (req, res, next) => {
  const { office_address, phonenumber, email_address, iframe } = req.body;
  var contact = await Contact.findOne({
    where: { phonenumber: phonenumber },
  });
  if (contact === null) {
    contact = await Contact.create({
      office_address,
      phonenumber,
      email_address,
      iframe,
    });
    res.status(200).json({
      message: `Contact is created`,
      data: contact,
    });
  }
  else{
    res.status(200).json({
      message: `Contact is already existed`,
      data: contact,
    });
  }
};
const getContacts = async (req, res, next) => {
  const contacts = await Contact.findAll();
  res.status(200).json({
    message: `get all contacts info`,
    data: contacts,
  });
};
module.exports = { createContact, getContacts };
