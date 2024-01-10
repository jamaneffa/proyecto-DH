const db = require("../database/models");
const { Op } = require("sequelize");
const {validationResult} = require('express-validator');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
	cloud_name: process.env.cloud_name, 
	api_key: process.env.api_key, 
	api_secret: process.env.api_secret 
});


const productsController = {

    search: async (req,res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const limit = 8; 

            const { count, rows } = await db.Product.findAndCountAll({
                where: {name: {[Op.like] : `%${req.query.search}%`}},
                include: [
                    {association: "categories"}, 
                    {association:"brands"}
                ],
                limit,
                offset: limit * (page - 1) 
            })

            const totalPages = Math.ceil(count / limit)

            return res.render('./products/listProducts', { products: rows, totalPages, currentPage: page });
        } catch (error) { 
            console.log(error.message); 
        }
    },

    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Página actual
            const limit = 8; // Cantidad de productos por página
    
            if (req.params.category) {
                const { count, rows } = await db.Product.findAndCountAll({
                    where: { category_id: req.params.category },
                    include: [
                        { association: "categories" },
                        { association: "brands" }
                    ],
                    limit,
                    offset: limit * (page - 1) // Cálculo del desplazamiento
                });
    
                const totalPages = Math.ceil(count / limit);
    
                return res.render('./products/listProducts', { products: rows, totalPages, currentPage: page });
            } else {
                const { count, rows } = await db.Product.findAndCountAll({
                    include: [
                        { association: "categories" },
                        { association: "brands" }
                    ],
                    limit,
                    offset: limit * (page - 1)
                });
    
                const totalPages = Math.ceil(count / limit);
    
                return res.render('./products/listProducts', { products: rows, totalPages, currentPage: page });
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    detail: async (req, res) => {
        try {
            let product = await db.Product.findByPk(
                req.params.id, 
                {include: [
                    {association:"categories"}, 
                    {association:"brands"}, 
                    {association:"productDetails"}
                ]}
            );
            let categoryProducts = await db.Product.findAll({
                where: {category_id: product.category_id},
                include: [
                  { association: 'categories' },
                  { association: 'brands' },
                  { association: 'productDetails'}
                ]
            });
            let sizes = await db.Size.findAll();
            return res.render('./products/productDetail.ejs', {
                        product: product,
                        categoryProducts : categoryProducts,
                        sizes : sizes
                    });

        } catch (error) { 
            console.log(error.message); 
        }
    },

    // Creación de productos

    create: async (req, res) => {
        try {
            let products = await db.Product.findAll();
            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll()

            return res.render('./products/createProduct.ejs', {
                products: products,
                categories : categories,
                brands : brands,
                sizes : sizes
            })

        } catch (error) { 
            console.log(error.message); 
        }
    },

    save: async (req, res) => {

        const resultValidation = validationResult(req);

        try {
            if (resultValidation.errors.length > 0) {
                let categories = await db.Category.findAll();
                let brands = await db.Brand.findAll();
                let sizes = await db.Size.findAll();
                return res.render('./products/createProduct.ejs', {
                    errors: resultValidation.mapped(),
                    old : req.body,
                    categories : categories,
                    brands : brands,
                    sizes : sizes
                })
            }
            else {
                let imageBuffer = req.file.buffer
                let customFileName = `product-${req.body.category}-` + Date.now()
                const folder = 'products'
                const uploadPromise = new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream({ folder: folder, resource_type: 'image', public_id: customFileName }, (error, result) => {
                    if (error) {
                        console.error('Error during upload:', error)
                        reject(error)
                    } else {
                        console.log('Upload successful:', result)
                        resolve(result)
                    }
                })
                streamifier.createReadStream(imageBuffer).pipe(stream)
                })
                const uploadedImage = await uploadPromise

                const newProduct = await db.Product.create({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    discount: req.body.discount,
                    image: customFileName,
                    category_id: req.body.category,
                    brand_id: req.body.brand
                })

                const availableSizes = req.body.size

                for (const size of availableSizes) {
                    await db.ProductDetail.create({
                      product_sku : newProduct.sku,
                      size_id: size,
                      stock: req.body[`stockForSizeId_${size}`]
                    })
                }
                
                return res.redirect('/');
            }
        }
        catch (error) { 
            console.log(error.message); 
        }
    },

    // Edición y eliminación de productos

    edit: async (req, res) => {
        
        try {
            let product = await db.Product.findByPk(req.params.id, { include: [{association: "categories"}, {association:"brands"}] });
            let categories = await db.Category.findAll();
            let brands = await db.Brand.findAll();
            let sizes = await db.Size.findAll();

            return res.render('./products/editProduct.ejs', {
                product: product,
                categories : categories,
                brands : brands,
                sizes: sizes
            })

        } catch (error) { 
            console.log(error.message); 
        }
    },
    update: async (req, res) => {
        const resultValidation = validationResult(req);

        try {
            let customFileName 
            
            if (resultValidation.errors.length > 0) {
                let product = await db.Product.findByPk(req.params.id);
                let categories = await db.Category.findAll();
                let brands = await db.Brand.findAll();
                let sizes = await db.Size.findAll();

                return res.render('./products/editProduct.ejs', {
                    errors : resultValidation.mapped(),
                    old : req.body,
                    product: product,
                    categories : categories,
                    brands : brands,
                    sizes: sizes
                })

                } else {

                    if (req.file) {

                        let imageBuffer = req.file.buffer
                        customFileName = `product-${req.body.category}-` + Date.now()
                        const folder = 'products'
                        const uploadPromise = new Promise((resolve, reject) => {
                        let stream = cloudinary.uploader.upload_stream({ folder: folder, resource_type: 'image', public_id: customFileName }, (error, result) => {
                            if (error) {
                                console.error('Error during upload:', error)
                                reject(error)
                            } else {
                                console.log('Upload successful:', result)
                                resolve(result)
                            }
                        })
                        streamifier.createReadStream(imageBuffer).pipe(stream)
                        })
                        const uploadedImage = await uploadPromise
                    } else {
                        customFileName = req.body.prevImage
                    }

                    await db.Product.update({
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        discount: req.body.discount,
                        image: customFileName,
                        category_id: req.body.category,
                        brand_id: req.body.brand
                    }, {
                        where : {sku: req.params.id}
                    }
                    )
                    return res.redirect('/products/' + req.params.id);
                }

            } catch (error) { 
                console.log(error.message); 
            }
    },

    erase: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);

            await db.ProductDetail.destroy({ where: {product_sku: product.sku} })
            await product.destroy()

            return res.redirect('/');

        } catch (error) { 
            console.log(error.message); 
        }
    }

}

module.exports = productsController;