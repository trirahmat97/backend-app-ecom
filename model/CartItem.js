const connection = require('../db');
const { DataTypes } = require('sequelize');
const CartItem = connection.define('cart_item', {
    quantity: DataTypes.INTEGER
});
module.exports = CartItem;