const {body} = require('express-validator');

const validations = [
    body('newPass')
        .isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),

    body('checkNewPass').custom((value, { req }) => {
        if (req.body.checkNewPass != req.body.newPass) {
            throw new Error('Las contraseñas no coinciden');
        } else {
            return true;
        }
    })
]

module.exports = validations    