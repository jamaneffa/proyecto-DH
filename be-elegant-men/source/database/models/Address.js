module.exports = (sequelize, DataTypes) => {

    const Address = sequelize.define(
        'Address',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            country : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            state : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            city : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            cp : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            street : {
                type : DataTypes.STRING(100),
                allowNull: false
            },
            street_number : {
                type : DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tablename : 'addresses',
            timestamps : false
        }
    )

    Address.associate = function (models) {
        Address.hasOne(models.User, {
            as : 'userAddress',
            foreignKey : 'id'
        })
    }
    
    return Address
}
