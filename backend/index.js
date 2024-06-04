const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);
setupWebSocket(server);

// Initialize SQLite database
initializeDatabase();

// Use routes
app.use(routes);

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
