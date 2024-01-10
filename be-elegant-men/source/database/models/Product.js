module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define(
        'Product',
        {
            sku : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            name : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            description : {
                type : DataTypes.TEXT,
                allowNull: false
            },
            price : {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            discount : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            image : {
                type : DataTypes.STRING(200),
                allowNull: false
            },
            category_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Category",
                    key: 'id'
                }
            },
            brand_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Brand",
                    key: 'id'
                }
            }
        },
        {
            tablename : 'products',
            timestamps : false
        }
    )

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as : 'categories',
            foreignKey : 'category_id'
        })
        Product.belongsTo(models.Brand, {
            as : 'brands',
            foreignKey : 'brand_id'
        })
        Product.hasMany(models.OrderDetail, {
            as : 'orderDetails',
            foreignKey : 'product_sku'
        })
        Product.belongsToMany(models.Size, {
            through: 'ProductDetail',
            as: 'productDetails',
            foreignKey: 'product_sku'
        })   
    }
    
    return Product
}
