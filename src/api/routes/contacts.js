const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts')
/**
 * GET request to /contact
 */
router.get('/',contactController.getContacts);

/**
 * POST create /contact
 */

router.post("/", contactController.createContact);
  

module.exports = router;