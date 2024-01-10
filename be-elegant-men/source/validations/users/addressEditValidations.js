const {body} = require('express-validator');
const path = require('path');

const validations = [

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
        .trim().not().notEmpty().withMessage('Debes completar este campo')
]

module.exports = validations    