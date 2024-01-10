const {body} = require('express-validator');
const path = require('path');

const validations = [
    body('first_name')
        .trim().not().notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),

    body('last_name')
        .trim().not().notEmpty().withMessage('Debes completar este campo').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),

    body('country').custom((value) => { 
        if (value === undefined) {
            throw new Error('Debes seleccionar un país');
        }
        return true;
    }),

    body('state')
        .trim().not().notEmpty().withMessage('Debes completar este campo'),

    body('city')
        .trim().not().notEmpty().withMessage('Debes completar este campo'),

    body('cp')
        .trim().not().notEmpty().withMessage('Debes completar este campo'),

    body('street')
        .trim().not().notEmpty().withMessage('Debes completar este campo'),

    body('street_number')
        .trim().not().notEmpty().withMessage('Debes completar este campo'),
    
    body('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    
    body('password')
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),

    body('repassword').custom((value, { req }) => {
        if (req.body.repassword != req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        } else {
            return true;
        }
    }),
    
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];

        if (file == undefined ) {
            throw new Error('Debes subir una imagen de perfil');
        } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error (`Las extensiones de imagen permitidas son ${acceptedExtensions.join(', ')}`);
        } else {
            return true
        }
    }
})
]

module.exports = validations    