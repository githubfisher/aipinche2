// App入口
require('env2')('./.env')
const Hapi = require('hapi');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');
const routesUsers = require('./routes/users');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
// 引入swagger文档插件
const pluginHapiSwagger = require('./plugins/hapi-swagger');
// 引入分页器插件
const pluginHapiPagination = require('./plugins/hapi-pagination');
// 引入JWT
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');


const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
});
const init = async () => {
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
    hapiAuthJWT2,
  ]);
  pluginHapiAuthJWT2(server);
  
  server.route([
    ...routesHelloHapi,
    ...routesUsers,
  ]);

  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();