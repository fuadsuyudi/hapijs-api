const Sequelize = require('sequelize');
const connet = require('./connection.js');
const model = connet.sequelize;

exports.User = model.define('users', {
    first_name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: "First name is required"
            },
            isAlpha: true,
        }
    },
    last_name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: "Last name is required"
            },
            isAlpha: true,
        }
    },
    username: {
        type: Sequelize.STRING,
        set(val) {
            this.setDataValue('username', val.toLowerCase());
        },
        validate: {
            notEmpty: {
                msg: "Username is required"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        set(val) {
            this.setDataValue('email', val.toLowerCase());
        },
        validate: {
            notEmpty: {
                msg: "Email is required"
            },
            isEmail: true,
        }
    },
    pin: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                msg: "Pin is required"
            },
        }
    }
});