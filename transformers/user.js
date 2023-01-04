const userTransformer = (user) => {
    if (user?.dataValues?.password) {
        delete user.dataValues.password
    }
    return user
}

module.exports = {
    userTransformer
}