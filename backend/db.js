const sqlite3 = require('sqlite3').verbose();
let db;

const initializeDatabase = () => {
  db = new sqlite3.Database(':memory:');
  db.serialize(() => {
    db.run(`CREATE TABLE settlements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL(10, 2) NOT NULL,
      status TEXT NOT NULL DEFAULT 'stale', 
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      settlement_id INTEGER,
      response TEXT NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(settlement_id) REFERENCES settlements(id)
    )`);
  });
};

const getLatestSettlement = (callback) => {
  db.get('SELECT * FROM settlements ORDER BY updated_at DESC LIMIT 1', callback);
};

const getLatestResponse = (callback) => {
  db.get('SELECT * FROM responses ORDER BY created_at DESC LIMIT 1', callback);
};

const insertSettlement = (amount, status, callback) => {
  const stmt = db.prepare('INSERT INTO settlements (amount, status) VALUES (?, ?)');
  stmt.run(amount, status, callback);
};

const insertResponse = (settlementId, response, callback) => {
  const stmt = db.prepare('INSERT INTO responses (settlement_id, response) VALUES (?, ?)');
  stmt.run(settlementId, response, callback);
};

const updateSettlementStatus = (status, settlementId, callback) => {
  db.run('UPDATE settlements SET status = ? WHERE id = ?', [status, settlementId], callback);
};

module.exports = {
  initializeDatabase,
  getLatestSettlement,
  getLatestResponse,
  insertSettlement,
  insertResponse,
  updateSettlementStatus,
};
