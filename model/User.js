const { DataTypes } = require('sequelize');
const connection = require('../db');

const User = connection.define('user', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your Email'
            },
            isEmail: {
                msg: "Must be an Email Format"
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your Name'
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your username'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please enter your Password'
            }
        }
    },
    phone: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM,
        values: ['admin', 'administrator'],
        defaultValue: 'administrator'
    },
    isVerified: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
    },
    imagePath: DataTypes.STRING
}, {
    timestamps: true
});

module.exports = User;