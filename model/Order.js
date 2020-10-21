const connection = require('../db');
const Order = connection.define('order', {});
module.exports = Order;