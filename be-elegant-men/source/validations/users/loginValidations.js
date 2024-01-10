const {body} = require('express-validator');

const validations = [    
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
]

module.exports = validations