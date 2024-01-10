const express = require ('express');
const router = express.Router();

// Controller
const productsController = require ('../controllers/productsController');

// Middlewares
const multer = require('multer');
const upload = multer();
const isAdmin = require('../middlewares/isAdmin');

// Validators
const createProductsValidations = require('../validations/products/createProductsValidations');
const editProductsValidations = require('../validations/products/editProductsValidations');

// Product creation routes
router.get('/create', isAdmin, productsController.create); 
router.post('/save', upload.single('image'), createProductsValidations, productsController.save);

// Product reading routes
router.get('/search', productsController.search);
router.get('/list/:category?', productsController.list);
router.get('/:id', productsController.detail);

// Product edition routes
router.get('/:id/edit', isAdmin, productsController.edit);
router.put('/:id', upload.single('image'), editProductsValidations, productsController.update);

// Product erasing route
router.delete('/:id', productsController.erase);

module.exports = router;