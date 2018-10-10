
'use strict';

const users = {
    name: 'users',
    version: '1.0.0',
    register: function(server, options) {
        server.route({
            method: 'GET',
            path: '/users',
            handler: (request, h) => {
                return 'Hello, index user plugin!';
            }
        })

        server.route({
            method: 'GET',
            path: '/users/profile',
            handler: (request, h) => {
                return 'Hello, profile user plugin!';
            }
        })
    }
}

module.exports = users;