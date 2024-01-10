module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(
	    'User',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            first_name : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            last_name : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            dni : {
                type : DataTypes.STRING(25),
                allowNull: false
            },
            address_id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                references: {
                    model: "Address",
                    key: 'id'
                }
            },
            email : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            password : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            avatar : {
                type : DataTypes.STRING(200),
                allowNull: false
            },
            admin : {
                type : DataTypes.INTEGER(1),
                allowNull: false
            }
        },
        {
            tablename : 'users',
            timestamps : false
        }
    )   

    User.associate = function (models) {
        User.belongsTo(models.Address, {
            as : 'addresses',
            foreignKey : 'address_id'
        })
        User.hasMany(models.Order, {
            as : 'userOrders',
            foreignKey : 'user_id'
        })
    }

    return User
}
