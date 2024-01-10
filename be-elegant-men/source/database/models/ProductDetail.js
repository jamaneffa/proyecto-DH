module.exports = (sequelize, DataTypes) => {

    const ProductDetail = sequelize.define(
        'ProductDetail',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            product_sku : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Product",
                    key: 'sku'
                }
            },            
            size_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Size",
                    key: 'id'
                }
            },
            stock : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false
            }
        },
        {
            tablename : 'productdetails',
            timestamps : false
        }
    )
    
    return ProductDetail
}