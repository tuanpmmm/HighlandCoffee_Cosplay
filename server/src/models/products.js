'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Products extends Model {
        static associate({ Categories, Orders, Comments }) {
            this.belongsTo(Categories, {
                foreignKey: 'category_id',
            });
            this.hasMany(Orders, {
                foreignKey: 'product_id'
            });
            this.hasMany(Comments, {
                foreignKey: 'product_id',
            });
        }
    };

    Products.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            category_id: DataTypes.INTEGER,
            price :DataTypes.DOUBLE,
            discount: {
                defaultValue: 0,
                type: DataTypes.INTEGER
            },
            quantity: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            image: DataTypes.TEXT,
            slug: DataTypes.STRING,
            is_deleted: {
                defaultValue: false,
                type: DataTypes.BOOLEAN
            }
        },
        {
            sequelize,
            modelName: 'Products',
            freezeTableName: true,
        }
    );
    
    return Products;
}


