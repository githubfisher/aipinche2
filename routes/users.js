// routes/users.js

const JWT = require('jsonwebtoken');
const GROUP_NAME = 'users';
const { paginationDefine } = require('../utils/router-helper');
// 引入 models
const models = require("../models");
module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      // 通过 await 来异步查取数据
      const { rows: results, count: totalCount } = await models.users.findAndCountAll({
        attributes: [
            'id',
            'name',
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
      reply({results, totalCount})
    },
    config: {
        tags: ['api', GROUP_NAME],
        auth: false,
        description: '获取用户列表',
        validate: {
          query: {
            ...paginationDefine
          }
        }
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, reply) => {
      const generateJWT = (jwtInfo) => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
        return JWT.sign(payload, process.env.JWT_SECRET);
      };
      reply(generateJWT({
        userId: 1,
      }));
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '用于测试的用户 JWT 签发',
      auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
    },
  }
];