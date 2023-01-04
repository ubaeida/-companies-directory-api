const adminTransformer = (admin) => {
    if (admin?.dataValues?.password) {
        delete admin.dataValues.password
    }
    return admin
}

module.exports = {
    adminTransformer
}