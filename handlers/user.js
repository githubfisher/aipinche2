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

async function createJwt(request, reply) {
  const generateJWT = (jwtInfo) => {
    const payload = {
      userId: jwtInfo.userId,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
    };
    return JWT.sign(payload, process.env.JWT_SECRET);
  };
  reply(generateJWT({userId: 1}));
};

module.exports = {
    getList: getList,
    createJwt: createJwt,
};