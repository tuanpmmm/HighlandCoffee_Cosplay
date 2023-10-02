'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Notifications extends Model {
        static associate({ Customers }) {
            this.belongsTo( Customers, {
                foreignKey: 'customer_id',
            });
        }
    };

    Notifications.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            customer_id: DataTypes.INTEGER,
            text: DataTypes.TEXT,
            is_seen: {
                defaultValue: false,
                type: DataTypes.BOOLEAN
            }
        },
        {
            sequelize,
            modelName: 'Notifications',
            freezeTableName: true,
        }
    );
    
    return Notifications;
}


