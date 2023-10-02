'use strict';
const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {

    class Customers extends Model {
        static associate({ Orders, Comments, Notifications }) {
            this.hasMany(Orders, {
                foreignKey: 'customer_id',
            });
            this.hasMany(Comments, {
                foreignKey: 'customer_id',
            });
            this.hasMany(Notifications, {
                foreignKey: 'customer_id',
            });
        }
    };

    Customers.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            fullname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            is_admin: {
                defaultValue: false,
                type: DataTypes.BOOLEAN
            }
        },
        {
            sequelize,
            modelName: 'Customers',
            freezeTableName: true,
        }
    );
    
    return Customers;
}


