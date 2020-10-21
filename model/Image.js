const { DataTypes } = require('sequelize');
const connection = require('../db');

const Image = connection.define('image', {
    url: DataTypes.STRING,
    path: DataTypes.STRING,
    description: DataTypes.STRING
});

module.exports = Image;