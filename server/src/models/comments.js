'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Comments extends Model {
        static associate({ Products, Customers }) {
            this.belongsTo( Products, {
                foreignKey: 'product_id',
            });
            this.belongsTo( Customers, {
                foreignKey: 'customer_id',
            });
        }
    };

    Comments.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            text: DataTypes.TEXT ,
        },
        {
            sequelize,
            modelName: 'Comments',
            freezeTableName: true,
        }
    );
    
    return Comments;
}


