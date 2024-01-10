const express = require('express');
const router = express.Router();

// Controller
const apiProductsController = require('../../controllers/apiControllers/apiProductsController');

// Routes
router.get('/', apiProductsController.index);
router.get('/categories', apiProductsController.category);
router.get("/lastproduct", apiProductsController.lastProduct);
router.get('/:id', apiProductsController.detail);
router.get('/stock/:id', apiProductsController.stock);

module.exports = router;