const {body} = require('express-validator');
const path = require('path');

const validations = [
    body('name')
        .notEmpty().withMessage('Debes asignarle un nombre al producto').bail()
        .isLength({ min: 5 }).withMessage('El nombre del producto debe contener al menos 5 caracteres'),

    body('description')
        .notEmpty().withMessage('Debes describir el detalle del producto').bail()
        .isLength({ min: 20 }).withMessage('La descripcion del producto debe contener al menos 20 caracteres'),

    body('size')
        .notEmpty().withMessage('Debes elegir al menos un talle y asignarle un stock').bail(),   

    body('price')
        .notEmpty().withMessage('Debes indicar el precio al producto')
        .isFloat({ min: 0 }).withMessage('El precio del producto no puede ser menor que 0'),

    body('discount')
        .notEmpty().withMessage('Debes asignarle un descuento al producto')
        .isFloat({ min: 0 }).withMessage('El descuento no puede ser menor que 0'),

    body('brand').custom((value) => { 
            if (value === undefined) {
                throw new Error('Debes seleccionar una marca');
            }
            return true;
        }),

    body('category').custom((value) => { 
            if (value === undefined) {
                throw new Error('Debes seleccionar una categoria');
            }
            return true;
        }),

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];

        if (file == undefined ) {
            throw new Error('Debes subir una imagen para el producto');
        } else {
        let fileExtension = path.extname(file.originalname)
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error (`Las extensiones de imagen permitidas son ${acceptedExtensions.join(', ')}`);
        } else {
            return true
        }}
    })
]

module.exports = validations





