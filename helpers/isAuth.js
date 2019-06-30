const jwt = require('jwt-simple');

const isAuth = async token => {
  let splitToken = token.split(' ');
  if (!splitToken[1]) {
    return false;
  }
  const user = await jwt.decode(splitToken[1], process.env.JWT_PASS);
  if (!user) {
    return false;
  }
  return user;
};

module.exports = {
  isAuth
};
