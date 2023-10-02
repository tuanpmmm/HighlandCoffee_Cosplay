'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Orders extends Model {
        static associate({ Products, Customers }) {
            this.belongsTo( Products, {
                foreignKey: 'product_id',
            });
            this.belongsTo( Customers, {
                foreignKey: 'customer_id',
            });
        }
    };

    Orders.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            customer_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER ,
            price: DataTypes.DOUBLE,
            status: {
                defaultValue: 'Chờ xác nhận',
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'Orders',
            freezeTableName: true,
        }
    );
    
    return Orders;
}


