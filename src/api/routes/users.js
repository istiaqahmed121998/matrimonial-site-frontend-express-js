

const express = require('express');
const router = express.Router();
const userController = require("../controllers/users")
/**
 * GET request to /authors
 */
router.get('/',userController.getUsers);

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

router.post("/",userController.createUser);
  

module.exports = router;