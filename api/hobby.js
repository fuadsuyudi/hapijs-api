
'use strict';

const hobby = {
    name: 'hobby',
    version: '1.0.0',
    register: function(server, options) {
        server.route({
            method: 'GET',
            path: '/hobby',
            handler: (request, h) => {
                return 'Hello, index hobby plugin!';
            }
        })

        server.route({
            method: 'GET',
            path: '/hobby/profile',
            handler: (request, h) => {
                return 'Hello, profile hobby plugin!';
            }
        })
    }
}

module.exports = hobby;