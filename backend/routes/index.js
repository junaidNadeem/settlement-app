const express = require('express');
const settlementRoutes = require('./settlement');
const responseRoutes = require('./response');

const router = express.Router();

router.use('/settlement', settlementRoutes);
router.use('/response', responseRoutes);

module.exports = router;
