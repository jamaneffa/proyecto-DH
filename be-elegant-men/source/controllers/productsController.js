const {validationResult} = require('express-validator');

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
	cloud_name: process.env.cloud_name, 
	api_key: process.env.api_key, 
	api_secret: process.env.api_secret 
});

const productServices = require('../services/productServices')

const productsController = {

    search: async (req,res) => {
        try {
            const page = parseInt(req.query.page) || 1; 
            const limit = 8; 

            const { count, rows } = await productServices.getAndCountAllProductsByQuery(
                req.query.search, 
                limit, 
                page
            )

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
                const { count, rows } = await productServices.getAndCountAllProductsByCategory(
                    req.params.category, 
                    limit, 
                    page
                )
    
                const totalPages = Math.ceil(count / limit);
    
                return res.render('./products/listProducts', { products: rows, totalPages, currentPage: page });
            } else {
                const { count, rows } = await productServices.getAndCountAllProducts(limit,page)
    
                const totalPages = Math.ceil(count / limit);
    
                return res.render('./products/listProducts', { products: rows, totalPages, currentPage: page });
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    detail: async (req, res) => {
        try {
            let product = await productServices.getProductByPk(req.params.id)
            let categoryProducts = await productServices.getAllProductsByCategory(product.category_id)
            let sizes = await productServices.getAllSizes()
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
            let categories = await productServices.getAllCategories()
            let brands = await productServices.getAllBrands()
            let sizes = await productServices.getAllSizes()

            return res.render('./products/createProduct.ejs', {
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
                let categories = await productServices.getAllCategories()
                let brands = await productServices.getAllBrands()
                let sizes = await productServices.getAllSizes()
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

                const newProduct = await productServices.createProduct(req.body, customFileName)

                const availableSizes = req.body.size

                for (const size of availableSizes) {
                    await productServices.createProductDetail(newProduct, size, req.body)
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
            let product = await productServices.getProductByPk(req.params.id)
            let categories = await productServices.getAllCategories()
            let brands = await productServices.getAllBrands()
            let sizes = await productServices.getAllSizes()

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
                let product = await productServices.getProductByPk(req.params.id)
                let categories = await productServices.getAllCategories()
                let brands = await productServices.getAllBrands()
                let sizes = await productServices.getAllSizes()    

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

                    await productServices.updateProduct(req.body, customFileName, req.params.id)

                    return res.redirect('/products/' + req.params.id);
                }

            } catch (error) { 
                console.log(error.message); 
            }
    },

    erase: async (req, res) => {
        try {
            const product = await productServices.getProductByPk(req.params.id)

            await productServices.deleteProductDetail(product.sku)
            await productServices.deleteProduct(product.sku)

            return res.redirect('/');

        } catch (error) { 
            console.log(error.message); 
        }
    }

}

module.exports = productsController;