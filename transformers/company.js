const companyTransformer = (company) => {
    if (company?.dataValues?.password) {
        delete company.dataValues.password
    }
    return company
}
const companiesTransformer = (companies) => { 
    return companies.map((companey) => companyTransformer(companey))
}
module.exports = {
    companyTransformer,
    companiesTransformer
}