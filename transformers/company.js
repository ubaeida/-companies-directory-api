const companyTransformer = (company) => {
    if (company?.dataValues?.password) {
        delete company.dataValues.password
    }
    return company
}

module.exports = {
    companyTransformer
}