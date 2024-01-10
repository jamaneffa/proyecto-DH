const express = require ('express');
const router = express.Router();

// Controller
const mainController = require ('../controllers/mainController');

// Middlewares
const isAdmin = require('../middlewares/isAdmin');

// Index route
router.get('/', mainController.index);

// Dashboard Route
router.get('/dashboard', isAdmin, mainController.dashboard);

module.exports = router;