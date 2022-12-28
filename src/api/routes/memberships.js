

const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/memberships')
/**
 * GET request to /authors
 */
router.get('/',membershipController.getAllMemberships);

/**
 * GET request to /authors/:id
 */
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'user with id was fetch'
    });
});

/**
 * POST create /author
 */

router.post("/", membershipController.createMembership);
  

module.exports = router;