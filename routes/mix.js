// routes/mix.js
const routesHelloHapi = require('./hello-hapi');
const routesUsers = require('./users');

module.exports = [
    ...routesHelloHapi,
    ...routesUsers,
];