module.exports = (sequelize, DataTypes) => {

    const Size = sequelize.define(
	    'Size',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            size_name : {
                type : DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tablename : 'sizes',
            timestamps : false
        }
    )

    Size.associate = function (models) {
        Size.belongsToMany(models.Product, {
            through: 'ProductDetail',
            as: 'productSizes',
            foreignKey: 'size_id'
        })
    }    
        
    return Size
}