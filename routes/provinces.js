var express = require('express');
const { store, index } = require('../controllers/provinceController');
var router = express.Router();

router.post('/', store);
router.get('/', index);

module.exports = router;