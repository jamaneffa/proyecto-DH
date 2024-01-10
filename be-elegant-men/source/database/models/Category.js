module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define(
	    'Category',
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
            tablename : 'categories',
            timestamps : false
        }
    )

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as : 'productCategories',
            foreignKey : 'category_id'
        })
    }
        
    return Category
}