// handers/login.js

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
    createJwt: createJwt,
};