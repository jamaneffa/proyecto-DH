module.exports = (sequelize, DataTypes) => {

    const OrderDetail = sequelize.define(
        'OrderDetail',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            order_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Order",
                    key: 'id'
                }
            },            
            product_sku : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Product",
                    key: 'sku'
                }
            },
            quantity : {
                type: DataTypes.INTEGER(10),
                allowNull: false
            },
            unit_price : {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            },
            total_amount : {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false
            }
        },
        {
            tablename : 'orderdetails',
            timestamps : false
        }
    )

    OrderDetail.associate = function (models) {
        OrderDetail.belongsTo(models.Order, {
            as : 'order',
            foreignKey : 'order_id'
        })
        OrderDetail.belongsTo(models.Product, {
            as : 'orderProduct',
            foreignKey : 'product_sku'
        })
    }
    
    return OrderDetail
}