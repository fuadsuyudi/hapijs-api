
'use strict';

const model = require('../models/users');
const helper = require('../helper');
const User = model.User;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const connet = require('../models/connection');
const sequelize = connet.sequelize;

const users = {
    name: 'users',
    version: '1.0.0',
    register: function (server, options) {
        server.route({
            method: 'POST',
            path: '/register',
            handler: (request, h) => {
                let params = request.payload;
                const hash = bcrypt.hashSync(params['pin'], 10);

                return sequelize.transaction(function (t) {
                    return User.create({ 
                        first_name: params['first_name'],
                        last_name: params['last_name'],
                        username: params['username'],
                        email: params['email'],
                        pin: hash
                    }, { transaction: t }).then(dt => {
                        return dt
                    }).catch(err => {
                        return err
                    })

                    // return User.create({
                    //     firstName: 'Abraham',
                    //     lastName: 'Lincoln'
                    // }, { transaction: t }).then(function (user) {
                    //     return user.setShooter({
                    //         firstName: 'John',
                    //         lastName: 'Boothe'
                    //     }, { transaction: t });
                    // });

                }).then(function (result) {
                    return helper.SuccessResponse(result, 'Success')
                }).catch(function (err) {
                    return helper.FailResponse(err)
                });

                // return User.create({ 
                //     first_name: params['first_name'],
                //     last_name: params['last_name'],
                //     username: params['username'],
                //     email: params['email'],
                //     pin: hash
                // }).then(dt => {
                //     return helper.SuccessResponse(dt, 'Success')
                // }).catch(err=>{
                //     return helper.FailResponse(err)
                // })
            }
        })

        server.route({
            method: 'GET',
            path: '/users',
            handler: async (request, h) => {
                const data = await User.findAll({
                    attributes: ['id', 'first_name', 'last_name', 'username', 'email', 'createdAt', 'updatedAt']
                })

                return helper.SuccessResponse(data, 'Success')
            }
        })

        server.route({
            method: 'GET',
            path: '/users/profile',
            handler: async (request, h) => {
                let params = request.query
                const Op = Sequelize.Op;

                const data = await User.findOne({
                    attributes: ['id', 'first_name', 'last_name', 'username', 'email'],
                    where: {
                        [Op.or]: {
                            id: {
                                [Op.eq]: params['user']
                            },
                            email: {
                                [Op.eq]: params['user']
                            },
                            username: {
                                [Op.eq]: params['user']
                            }
                        }
                    }
                })

                return helper.SuccessResponse(data, 'Success')
            }
        })
    }
}

module.exports = users;