const connection = require('../db');
const ImageProduct = connection.define('image_product', {});
module.exports = ImageProduct;