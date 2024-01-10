const {body} = require('express-validator');
const path = require('path');

const validations = [
  
    body('avatar').custom((value, { req }) => {
        if (req.file) {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ];
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de imagen permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        } 

        return true
})
]

module.exports = validations    