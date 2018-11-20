// App入口
require('env2')('./.env');
const Hapi = require('hapi');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const config = require('./config/mix');
const router = require('./routes/mix');
const plugin = require('./plugins/mix');

const server = new Hapi.Server();
server.connection({
  port: config.base.port,
  host: config.base.host,
});

const logOptions = config.log;
server.register({
  register: require('good'),
  logOptions,
});

const init = async () => {
  await server.register([
    ...plugin.swagger,
    plugin.pagination,
    hapiAuthJWT2,
  ]);

  plugin.jwt(server);
  
  server.route(router);

  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();