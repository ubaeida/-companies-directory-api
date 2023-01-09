const userTransformer = (user) => {
  if (user?.dataValues?.password) {
    delete user.dataValues.password;
  }
  return user;
};

const usersTransformer = (users) => {
  return users.map((user) => userTransformer(user));
};
module.exports = {
  userTransformer,
  usersTransformer,
};
