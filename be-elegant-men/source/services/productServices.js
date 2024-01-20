const db = require('../database/models')
const { Op } = require("sequelize");

let productAssociations = [
  { association: "categories" },
  { association: "brands" },
  { association: "productDetails" },
];

const productServices = {
    getAllProducts : () => db.Product.findAll({include : productAssociations}),
    getAllBrands : () => db.Brand.findAll(),
    getAllCategories : () => db.Category.findAll(),
    getAllSizes : () => db.Size.findAll(),
    getProductByPk : (id) => db.Product.findByPk(id,{include : productAssociations}),
    getProductByName : (name) => db.Product.findOne({
        where : {name: name},
        include : productAssociations
    }),
    getAllProductsByCategory : (category_id) => db.Product.findAll({
        where : {category_id: category_id},
        include : productAssociations
    }),
    getAndCountAllProducts : (limit, page) => db.Product.findAndCountAll({
        include: productAssociations,
        limit: limit,
        offset: limit * (page - 1) 
    }),
    getAndCountAllProductsByQuery : (querySearch, limit, page) => db.Product.findAndCountAll({
        where: {name: {[Op.like] : querySearch}},
        include: productAssociations,
        limit: limit,
        offset: limit * (page - 1) 
    }),
    getAndCountAllProductsByCategory : (category_id, limit, page) => db.Product.findAndCountAll({
        where : {category_id: category_id},
        include: productAssociations,
        limit: limit,
        offset: limit * (page - 1) 
    }),
    getProductsDetailsBySku : (sku) => db.ProductDetail.findAll({
        where : {product_sku: sku}
    }),
    getLastProductInDb : () =>  db.Product.findOne({
        order: [["sku", "DESC"]],
        include: productAssociations
    }),
    createProduct : (body, customFileName) => db.Product.create({
        name: body.name,
        description: body.description,
        price: body.price,
        discount: body.discount,
        image: customFileName,
        category_id: body.category,
        brand_id: body.brand
    }),
    createProductDetail : (product, size, body) => db.ProductDetail.create({
        product_sku : product.sku,
        size_id: size,
        stock: body[`stockForSizeId_${size}`]
    }),
    updateProduct : (body, customFileName, id) => db.Product.update({
        name: body.name,
        description: body.description,
        price: body.price,
        discount: body.discount,
        image: customFileName,
        category_id: body.category,
        brand_id: body.brand
    }, {
        where : {sku: id}
    }),
    deleteProduct : (id) => db.Product.destroy({ where: {sku: id} }),
    deleteProductDetail : (id) => db.ProductDetail.destroy({ where: {product_sku: id} })
}

module.exports = productServices

