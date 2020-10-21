const { Sequelize } = require('sequelize');
const connection = new Sequelize('app-ari', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    }
});
module.exports = connection;