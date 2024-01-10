module.exports = (sequelize, DataTypes) => {

    const Brand = sequelize.define(
	    'Brand',
        {
            id : {
                type : DataTypes.INTEGER(10).UNSIGNED,
                primaryKey : true,
                autoIncrement : true,
                allowNull: false
            },
            name : {
                type : DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tablename : 'brand',
            timestamps : false
        }
    )

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
            as : 'productBrands',
            foreignKey : 'brand_id'
        })
    }
        
    return Brand
}