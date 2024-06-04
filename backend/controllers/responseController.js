const {
  getLatestResponse,
  getLatestSettlement,
  insertResponse,
  updateSettlementStatus,
} = require("../db");

const getLatestResponseStatus = (req, res) => {
  getLatestResponse((err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

const submitResponse = (req, res) => {
  const { response } = req.body;

  getLatestSettlement((err, row) => {
    if (!row) {
      return res
        .status(404)
        .json({ message: "No settlement found to respond to" });
    }

    const settlementId = row.id;

    insertResponse(settlementId, response, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const status = response === "agreed" ? "settled" : "disputed";
      updateSettlementStatus(status, settlementId, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: `Settlement ${status}` });
      });
    });
  });
};

module.exports = {
  getLatestResponseStatus,
  submitResponse,
};
