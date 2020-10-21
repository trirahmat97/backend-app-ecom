const connection = require('../db');
const Cart = connection.define('cart', {});
module.exports = Cart;