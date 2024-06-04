const express = require('express');
const { getLatestResponseStatus, submitResponse } = require('../controllers/responseController');

const router = express.Router();

// Fetch the latest response status from Party B
router.get('/latest', getLatestResponseStatus);

// Respond to the settlement by Party B
router.post('/submit', submitResponse);

module.exports = router;
