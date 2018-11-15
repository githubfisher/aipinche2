// config/index.js
// 项目基本配置
// 配置服务器启动 host 与端口
const { env } = process;

module.exports = {
    host: env.HOST,
    port: env.PORT,
}