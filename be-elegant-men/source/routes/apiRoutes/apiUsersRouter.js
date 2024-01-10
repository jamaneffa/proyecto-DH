const express = require('express');
const router = express.Router();

// Controller
const apiUsersController = require('../../controllers/apiControllers/apiUsersController')

// Routes
router.get('/', apiUsersController.index);
router.get('/:id', apiUsersController.detail);

module.exports = router;