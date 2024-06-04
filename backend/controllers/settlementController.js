const { getLatestSettlement, insertSettlement, getLatestResponse } = require('../db');
const { broadcastToPartyB } = require('../websocket');

const getLatestSettlementAmount = (req, res) => {
  getLatestSettlement((err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

const updateSettlementAmount = (req, res) => {
  const { amount } = req.body;

  getLatestResponse((err, row) => {
    if (row && row.response == 'agreed') {
      return res.status(409).json({ message: 'Party B has already responded. Please fetch the latest status.' });
    }

    insertSettlement(amount, 'stale', (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      broadcastToPartyB({ type: 'update', amount });
      res.status(200).json({ message: 'Settlement amount updated' });
    });
  });
};

module.exports = {
  getLatestSettlementAmount,
  updateSettlementAmount,
};
