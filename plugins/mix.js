// plugins/mix.js
const swagger = require('./hapi-swagger');
const pagination = require('./hapi-pagination');
const authJWT2 = require('./hapi-auth-jwt2');

module.exports = {
    swagger: swagger,
    pagination: pagination,
    jwt: authJWT2,
};