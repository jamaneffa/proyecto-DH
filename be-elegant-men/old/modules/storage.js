const fs = require('fs');
const {extname,resolve} = require('path')
const {diskStorage} = require('multer');

let destination = folder => (req, file, callback) =>{
    let path = "";
    let category = req.body.category;

    let categoryName;

    switch (category) {
        case "1": categoryName = "ambos";
            break;
        case "2": categoryName = "camisas";
            break;
        case "3": categoryName = "corbatas";
            break;
        case "4": categoryName = "pantalones";
            break;
        case "5": categoryName = "sacos";
            break;
        case "6": categoryName = "zapatos";
            break;
        default: categoryName = "Valor no válido";
    }

    req.body.category ? path = resolve(__dirname,'../../public/img/products/', categoryName) : path = resolve(__dirname,'..','..','public','img','users');
    if(!fs.existsSync(path)){
        fs.mkdirSync(path)
    }
    return callback(null, path)
} 
let filename = (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + extname(file.originalname));

const storage = folder => diskStorage({
    destination: destination(folder),
    filename: filename
});

module.exports = storage;