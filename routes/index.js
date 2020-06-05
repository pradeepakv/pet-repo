const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));

router.use('/pets', require('./pets'));

module.exports = router;