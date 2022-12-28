const express = require('express');
const router = express.Router();
const accessController = require('../controllers/access')
router.post('/login',accessController.getAccessToken);

module.exports = router;