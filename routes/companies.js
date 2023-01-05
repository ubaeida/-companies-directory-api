var express = require('express');
var router = express.Router();
var { store  , login} = require('../controllers/companyController')

/* GET users listing. */
router.post('/register', store);
router.post('/login', login);

module.exports = router;