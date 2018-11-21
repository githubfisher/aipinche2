// routes/users.js
const GROUP_NAME = 'users';
const paginationDefine = require('../validaters/pagination');
const userHandler = require("../handlers/user");

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: userHandler.getList,
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取用户列表',
      auth: false,
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
    handler: userHandler.createJwt,
    config: {
      tags: ['api', GROUP_NAME],
      description: '用于测试的用户 JWT 签发',
      auth: false,
    },
  }
];