const {body} = require('express-validator');
const path = require('path');

const validations = [
    body('first_name')
        .trim().not().notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),

    body('last_name')
        .trim().not().notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),

    body('dni')
        .trim().not().notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({ min: 8 }).withMessage('El DNI esta incompleto')
]

module.exports = validations    