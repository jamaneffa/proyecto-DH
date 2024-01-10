const db = require('../../database/models/index');

const apiProductsController = {

    index: async (req, res) => {
		try {
			await db.Product.findAll({
				include: [{association: "categories"}, {association:"brands"}]
			})
			.then(products => {
				return res.status(200).json({
					status: 200,  
					count: products.length,
					countByCategory : {
						ambos : products.filter((product) => product.category_id === 1).length,
						camisas : products.filter((product) => product.category_id === 2).length,
						corbatas : products.filter((product) => product.category_id === 3).length,
						pantalones : products.filter((product) => product.category_id === 4).length,
						sacos : products.filter((product) => product.category_id === 5).length,
						zapatos : products.filter((product) => product.category_id === 6).length
					},
					products: products.map(product => ({
						sku : product.sku,
						name : product.name,
						detail : `http://localhost:3030/api/products/${product.sku}`
						//detail : `https://bem-cvku.onrender.com/api/products/${product.sku}`  url for deployed website
					}))
				})
			})
			.catch(err => {
				res.send(err)
			})

		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				status: 500,
				message: "Internal Server Error"
			});
		}
	},
	detail: async (req, res) => {
		try {
			await db.Product.findByPk(req.params.id, {
				include: [{association: "categories"}, {association:"brands"}, {association:"productDetails"}] }
			)
			.then(product => {
				return res.status(200).json({
				status: 200,
				product: {
					sku : product.sku,
					name : product.name,
					description : product.description,
					stockInfo : product.productDetails.map(product => ({
						size: product.size_name,
						stock: product.ProductDetail.stock
					})),
					price: product.price,
					discount: product.discount,
					category: product.categories.name, 
					brand : product.brands.name,
					image_url : `https://res.cloudinary.com/dmqvbjyyi/image/upload/v1696350997/products/${product.image}`
				}
			})
			})
			.catch(err => {
				res.send(err)
			})
		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				status: 500,
				message: "Internal Server Error"
			});
		}
	},
	category: async (req, res) => {
		try {
			await db.Category.findAll()
				.then(categories => {
					return res.status(200).json({
						count: categories.length,
						categories: categories,
					})
				})
		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				status: 500,
				message: "Internal Server Error"
			});
		}
	},
	lastProduct: async (req, res) => {
		try {
			await db.Product.findOne({
				order: [["sku", "DESC"]],
				include: [{association: "categories"}, {association:"brands"}]
			})
			.then((product) => {
				return res.status(200).json({
					status: 200,
					product: {
						name: product.name,
						description: product.description,
						price: product.price,
						discount: product.discount,
						image_url: `https://res.cloudinary.com/dmqvbjyyi/image/upload/v1696350997/products/${product.image}`
					},
				})
			})
			.catch((err) => {
				res.send(err)
			})

		} catch (error) {
			console.log(error.message);
			res.status(500).json({
				status: 500,
				message: "Internal Server Error"
			});
		}
	},
	stock: async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id, {
            include: [{ association: "productDetails" }]
        });

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "No hay un producto con ese sku"
            });
        }

        const stockInfo = product.productDetails.map(product => ({
            size: product.size_name,
            stock: product.ProductDetail.stock
        }));

        return res.status(200).json({
            status: 200,
            product: {
                sku: product.sku,
                name: product.name,
                stock: stockInfo
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

}


module.exports = apiProductsController;