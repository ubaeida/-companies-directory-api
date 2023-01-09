const { verifyToken } = require("../services/tokenService");

const isAuth = (req, res, next, allwoedUsers) => {
  const header = req?.headers?.authorization;
  if (!header) {
    res.status(401);
    return res.send({
      success: false,
      message: ["you are not alowed to do so.."],
    });
  }
  const token = header.split(" ");
  const user = verifyToken(token[token.length - 1]);
  if (allwoedUsers.includes(user.type) || allwoedUsers.includes("all")) {
    return next();
  } else {
    res.status(401);
    return res.send({
      success: false,
      message: ["you are not alowed to do so.."],
    });
  }
};

module.exports = {
  isAuth,
};
