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

            const userToLogin = await User.findOne({ where : {email : req.body.email} ,
                include: [
                    {association: "addresses"}
                ]});
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

            const newAddress = await Address.create({
                country: req.body.country,
                state: req.body.state, 
                city: req.body.city,
                street: req.body.street,
                street_number: req.body.street_number,
                cp: req.body.cp
            });

            const result = await User.findOne({ where: { email: req.body.email } });
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

                await User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dni : req.body.dni,
                    email: req.body.email,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: customFileName,
                    admin: req.body.email.includes('@beelegantmen.com') ? 1 : 0,
                    address_id: newAddress.id 
                });
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

            await User.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dni : req.body.dni
                },
                {
                    where: { id: req.params.id }
                },
                {
                    include: [{ association: "addresses" }]
                }
            );

            const updatedUser = await User.findByPk(req.session.userLogged.id, {
                include: [{ association: "addresses" }]
            });
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

            await Address.update(
                {
                    country: req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                    cp: req.body.cp,
                    street: req.body.street,
                    street_number: req.body.street_number
                },
                {
                    where: { id: req.params.id }
                }
            );
            
            const updatedUser = await User.findByPk(req.session.userLogged.id, {
                include: [{ association: "addresses" }]
            });
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

            await User.update(
                {avatar: customFileName}, 
                {where : {id: req.params.id}}
            )
            const updatedUser = await User.findOne({ where: { id: req.params.id } ,
                include: [{ association: "addresses" }]
            });
    
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
            const userToUpdate = await User.findOne({ where: { email: req.body.email } });
            const correctPassword = bcryptjs.compareSync(req.body.actualPass, userToUpdate.password);
            if ((correctPassword) && (req.body.newPass == req.body.checkNewPass)) {
                User.update({
                    password: bcryptjs.hashSync(req.body.newPass, 10),
                        }, {where : {id: userToUpdate.id}}
                        )
                        const updatedUser = await User.findOne({ where: { id: req.params.id },
                            include: [{ association: "addresses" }]
                        });
    
                        req.session.userLogged = updatedUser;
    
                        res.redirect('/users/profile'); 
            }
        } catch (error) { 
            console.log(error.message); 
        }
    },

    destroy: async (req, res) => {
        try {
            await User.destroy({ where: {id: req.params.id} });
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
            const order = await Order.create({
              user_id: req.body.userId
            });
        
            // Variable para rastrear si hay suficiente stock para todos los productos
            let stockOk = true;
        
            // Itera a través de los productos en el formulario y crea registros en OrderDetail para cada uno
            for (let i = 0; i < req.body.totalProductos; i++) {
              const productName = req.body[`nombre_${i}`];
              const quantity = req.body[`cant_${i}`];
              const unitPrice = parseFloat(req.body[`precio_${i}`].replace(/[^0-9.]/g, '')).toFixed(2)
              const totalPrice = parseFloat(req.body[`precio_total_${i}`].replace(/[^0-9.]/g, '')).toFixed(2)
        
              // Busca el producto por nombre en la tabla Product (asegúrate de que los campos coincidan)
              const product = await Product.findOne({ where: { name: productName } });
        
              // Verifica si hay suficiente stock disponible
              if (product && product.stock >= quantity) {
                await OrderDetail.create({
                  order_id: order.id,
                  product_sku: product.sku, // Asegúrate de que los campos coincidan
                  quantity: quantity,
                  unit_price: unitPrice,
                  total_amount: totalPrice,
                });
        
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