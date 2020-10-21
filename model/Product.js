const { DataTypes } = require('sequelize');
const connection = require('../db');

const Product = connection.define('product', {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your Email'
            }
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your price'
            }
        }
    },
    thumbnail: DataTypes.STRING,
    thumbnailPath: DataTypes.STRING,
    weight: DataTypes.STRING,
    description: DataTypes.TEXT,
    diskon: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
}, {
    timestamps: true
});

module.exports = Product;