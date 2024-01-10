module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define(
        'Order',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            user_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "User",
                    key: 'id'
                }
            },
            created_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            }
        },
        {
            tablename : 'orders',
            timestamps: false
        }
    )

    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            as : 'users',
            foreignKey : 'user_id'
        })
        Order.hasMany(models.OrderDetail, {
            as : 'orderDetails',
            foreignKey : 'order_id' 
        })
    }
    
    return Order
}
