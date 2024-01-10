const express = require ('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/usersController');

// Middlewares
const multer = require('multer');
const upload = multer();
const isLogged = require('../middlewares/isLogged');
const noLogged = require('../middlewares/noLogged');

// Validators
const registerValidations = require('../validations/users/registerValidations');
const loginValidations = require('../validations/users/loginValidations');
const contactValidations = require('../validations/users/contactValidations');
const addressEditValidations = require('../validations/users/addressEditValidations');
const personalInfoEditValidations = require('../validations/users/personalInfoEditValidations');
const avatarEditValidations = require('../validations/users/avatarEditValidations');
const passEditValidations = require('../validations/users/passEditValidations');

// User register routes
router.get('/register', isLogged, usersController.register);
router.post('/register', upload.single('avatar'), registerValidations, usersController.record);

// User login routes
router.get('/login', isLogged, usersController.login);
router.post('/login', loginValidations, usersController.access);

// Profile routes
router.get('/profile', usersController.profile);
router.get('/logout', usersController.logout);

// User editing routes
router.patch('/updateNames/:id', personalInfoEditValidations, usersController.updateUserPersonalInfo);
router.put('/updateAddress/:id', addressEditValidations, usersController.updateUserAddress);
router.patch('/updateAvatar/:id', upload.single('avatar'), avatarEditValidations, usersController.updateUserAvatar);
router.patch('/updatePass/:id', passEditValidations, usersController.updateUserPass);

// User deleting route
router.delete('/destroyUser/:id', usersController.destroy);

// User cart route
router.get('/cart', noLogged, usersController.cart);

// User processOrder route
router.post('/processOrder', usersController.processOrder)

// User favourites route
router.get('/favorites', noLogged, usersController.favorites);

// User contact route
router.get('/contact', usersController.contact);
router.post('/contact', contactValidations, usersController.sendMessage);

module.exports = router;