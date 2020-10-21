const connection = require('../db');
const { DataTypes } = require('sequelize');
const OrderItem = connection.define('order_item', {
    quantity: DataTypes.INTEGER
});
module.exports = OrderItem;