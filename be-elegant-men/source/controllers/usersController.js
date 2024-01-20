const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const {User, Order, OrderDetail, Address, Product} = require("../database/models");

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
	cloud_name: process.env.cloud_name, 
	api_key: process.env.api_key, 
	api_secret: process.env.api_secret 
});

const userServices = require('../services/userServices');
const productServices = require('../services/productServices');

const usersController = {

    //Login de usuarios
    login: async (req, res) => {
        try {
            return res.render('users/login')

        } catch (error) { console.log(error); }
    },

    access: async (req, res) => {
        try {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('users/login', {
                    errors: resultValidation.mapped(),
                    old : req.body
                });
            }

            const userToLogin = await userServices.getUserByEmail(req.body.email)
            if (!userToLogin) {
                return res.render('users/login', {
                    errors: {email: {msg: 'El email con el que intenta ingresar no existe'}}
                });
            }

            const correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (correctPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin
                if (req.body.remember) {
                    res.cookie('userEmail', req.body.email, {maxAge : (((1000 * 60) * 60)*24)});
                }
                return res.redirect('profile');
            } else {
                return res.render('users/login', {
                    errors: {password: {msg: 'Contraseña incorrecta'}},
                    old : req.body
                });
            }
        } catch (error) { 
            console.log(error.message); 
        }
    },

    // Registro de usuarios
    register: async (req , res) => { 
        try {
            return res.render('users/register');

        } catch (error) { 
            console.log(error.message); 
        }
    },

    record: async (req, res) => {
        const resultValidation = validationResult(req);
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    old: req.body
                });
            }

            const newAddress = await userServices.createAddress(req.body)

            const result = await userServices.getUserByEmail(req.body.email)
            if (!result) {

                let imageBuffer = req.file.buffer
                let customFileName = `avatar-` + Date.now()
                const folder = 'users'
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

                await userServices.createUser(req.body, customFileName, newAddress.id )
                
                return res.render('users/login');
            } else {
                return res.render('users/register', {
                    errors: { email: { msg: 'Este email ya se encuentra registrado' } },
                    old: req.body
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    //Profile access y logout
    profile: async (req , res) => { // GET profile
        try {
            return res.render('users/profile', {
                user: req.session.userLogged
            })

        } catch (error) { 
            console.log(error.message); 
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('userEmail')
            req.session.destroy()
            return res.redirect('/')

        } catch (error) { 
            console.log(error.message); 
        }
    },

    // Profile edit y erase
    updateUserPersonalInfo: async (req, res) => {

        const resultValidation = validationResult(req);
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/profile', {
                    errors: resultValidation.mapped(),
                    user: req.session.userLogged
                })
            }

            await userServices.updateUser(req.body, req.params.id)

            const updatedUser = await userServices.getUserById(req.session.userLogged.id)

            req.session.userLogged = updatedUser;
    
            res.redirect('/users/profile'); 
    
        } catch (error) {
            console.log(error.message);
        }
    },

    updateUserAddress: async (req,res) => {
        const resultValidation = validationResult(req);
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/profile', {
                    errors: resultValidation.mapped(),
                    user: req.session.userLogged
                })
            }

            await userServices.updateAddress(req.body, req.params.id)
            
            const updatedUser = await userServices.getUserById(req.session.userLogged.id)

            req.session.userLogged = updatedUser;
    
            res.redirect('/users/profile'); 
    
        } catch (error) {
            console.log(error.message);
        }
    },

    updateUserAvatar: async (req, res) => {
        const resultValidation = validationResult(req);
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/profile', {
                    errors: resultValidation.mapped(),
                    user: req.session.userLogged
                })
            }
            let imageBuffer = req.file.buffer
            let customFileName = `avatar-` + Date.now()
            const folder = 'users'
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

            await userServices.updateAvatar(customFileName, req.params.id)

            const updatedUser = await userServices.getUserById(req.session.userLogged.id)
    
            req.session.userLogged = updatedUser;
    
            res.redirect('/users/profile'); 
        } catch (error) {
            console.log(error.message)
        }
    },

    updateUserPass: async (req, res) => {
        const resultValidation = validationResult(req);
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/profile', {
                    errors: resultValidation.mapped(),
                    user: req.session.userLogged
                })
            }
            const userToUpdate = await userServices.getUserByEmail(req.body.email)

            const correctPassword = bcryptjs.compareSync(req.body.actualPass, userToUpdate.password);
            
            if ((correctPassword) && (req.body.newPass == req.body.checkNewPass)) {
                await userServices.updatePass(req.body.newPass, userToUpdate.id)
                
                const updatedUser = await userServices.getUserById(req.session.userLogged.id)

                req.session.userLogged = updatedUser;

                res.redirect('/users/profile'); 
            }
        } catch (error) { 
            console.log(error.message); 
        }
    },

    destroy: async (req, res) => {
        try {
            let user = await userServices.getUserById(req.params.id)

            await userServices.deleteUser(req.params.id)
            await userServices.deleteAddress(user.address_id)

            req.session.destroy();

            return res.redirect('/');
        } catch (error) {
            console.log(error.message)
        }
    },

    // Cart
    cart: async (req , res) => {
        try {
            return res.render('users/cart');
        } catch (error) {
            console.log(error.message)
        }
    },
    processOrder: async (req , res) => {
        try {
            // Crea una nueva orden en la tabla Order
            const order = await userServices.createOrder(req.body.userId)
        
            // Variable para rastrear si hay suficiente stock para todos los productos
            let stockOk = true;
        
            // Itera a través de los productos en el formulario y crea registros en OrderDetail para cada uno
            for (let i = 0; i < req.body.totalProductos; i++) {
              const productName = req.body[`nombre_${i}`];
              const quantity = req.body[`cant_${i}`];
              const unitPrice = parseFloat(req.body[`precio_${i}`].replace(/[^0-9.]/g, '')).toFixed(2)
              const totalPrice = parseFloat(req.body[`precio_total_${i}`].replace(/[^0-9.]/g, '')).toFixed(2)
        
              // Busca el producto por nombre en la tabla Product (asegúrate de que los campos coincidan)
              //productName
              const product = await productServices.getProductByName(productName)
              const productDetail = await productServices.getProductDetailsBySku(product.sku)
              
              for (size of productDetail.size_id)
              // Verifica si hay suficiente stock disponible
              if (product && productDetail.stock >= quantity) {
                await userServices.createOrderDetail(
                    order.id,
                    product.sku, 
                    productDetail.size_id,
                    quantity, 
                    unitPrice, 
                    totalPrice
                )
        
                // Actualiza el stock del producto restando la cantidad vendida

                const updatedStock = product.stock - quantity;
                await product.update({ stock: updatedStock });
              } else {
                console.error(`Producto no encontrado o no hay suficiente stock: ${productName}`);
                stockOk = false;
              }
            }
        
            if (stockOk) {     
              res.redirect('/users/cart');
            } else {
              res.status(400).send('No hay suficiente stock para algunos productos.');
            }

        } catch (error) {
            console.log(error.message)  
        }
    },

    // Favorites
    favorites: async (req , res) => {
        try {
            return res.render('users/favorites');
        } catch (error) {
            console.log(error.message)
        }
    },

    // Contact
    contact: async (req , res) => {
        try {
            return res.render('users/contact');
        } catch (error) {
            console.log(error.message)
        }
    },
    sendMessage: async (req , res) => {

        const resultValidation = validationResult(req)
        try {
            if (resultValidation.errors.length > 0) {
                return res.render('users/contact' , {
                    errors: resultValidation.mapped(),
                    old : req.body
                })
            } else {
                return res.send("Se envio el mensaje")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = usersController;