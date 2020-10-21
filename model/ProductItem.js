const connection = require('../db');
const ProductItem = connection.define('product_item', {
    quantity: Sequelize.INTEGER
});
module.exports = ProductItem;