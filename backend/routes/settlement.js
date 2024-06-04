const express = require('express');
const { getLatestSettlementAmount, updateSettlementAmount } = require('../controllers/settlementController');

const router = express.Router();

// Fetch the latest settlement amount
router.get('/latest', getLatestSettlementAmount);

// Update the settlement amount by Party A
router.post('/update', updateSettlementAmount);

module.exports = router;
