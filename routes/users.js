// routes/users.js

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
  }
]