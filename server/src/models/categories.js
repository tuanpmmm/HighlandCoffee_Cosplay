'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Categories extends Model {
        static associate({ Products }) {
            this.hasMany(Products, {
                foreignKey: 'category_id',
            });
        }
    };

    Categories.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Categories',
            freezeTableName: true,
        }
    );
    
    return Categories;
}


