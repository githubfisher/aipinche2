// App入口
require('env2')('./.env');
const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const config = require('./config/mix');
const router = require('./routes/mix');
const plugin = require('./plugins/mix');
const options = config.log;

const server = new Hapi.Server();
server.connection({
  port: config.base.port,
  host: config.base.host,
});

const init = async () => {
  await server.register([
    ...plugin.swagger,
    plugin.pagination,
    hapiAuthJWT2,
    {
      register: require('good'),
      options,
    }
  ]);

  plugin.jwt(server);
  server.route(router);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();