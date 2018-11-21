// handler/user.js
const models = require("../models");
const JWT = require('jsonwebtoken');

async function getList(request, reply) {
  // 通过 await 来异步查取数据
  const { rows: results, count: totalCount } = await models.users.findAndCountAll({
    attributes: [
      'id',
      'name',
    ],
    limit: request.query.limit,
    offset: (request.query.page - 1) * request.query.limit,
  });
  reply({results, totalCount});
};

module.exports = {
  getList: getList,
};