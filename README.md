# Project Overview

This project consists of a frontend and a backend. The frontend is built using React and runs on port 3001. The backend is built using Node.js with Express and runs on port 3000. We use SQLite3 for the database. The project uses WebSockets to constantly provide Party B with the latest settlement amounts.

## Key Features

- **Frontend**: Built with React, it provides the user interface for interacting with the system.
- **Backend**: Built with Node.js and Express, it handles API requests and database interactions.
- **Database**: SQLite3 is used to store settlements and responses.
- **WebSocket**: Keeps Party B updated with the latest settlement amounts in real-time.

## Project Structure

```
project-root
│
├── backend
│   ├── index.js
│   ├── db.js
│   ├── routes.js
│   ├── websocket.js
│   └── ... (other Node project files)
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.js
│   │   ├── PartyA.js
│   │   └── PartyB.js
│   ├── package.json
│   └── ... (other React project files)
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js installed
- npm installed

### Backend Setup

1. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the backend server:**

   ```bash
   npm start
   ```

   The backend server will start on [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. **Navigate to the frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend server:**

   ```bash
   npm start
   ```

   The frontend server will start on [http://localhost:3001](http://localhost:3001).

## WebSocket Usage

The project uses WebSocket to ensure Party B is always updated with the latest settlement amount. Party B's client listens for these updates and displays the latest settlement amount in real-time.

## API Endpoints

- **GET /settlement/latest**: Fetch the latest settlement amount.
- **GET /response/latest**: Fetch the latest response status from Party B.
- **POST /settlement/update**: Update the settlement amount by Party A.
- **POST /response/submit**: Respond to the settlement by Party B.

## UI Components

- **App.js**: Displays both components based on URL.
- **PartyA.js**: Handles settlement amount input and update functionality. Also implements functionality to fetch the latest response.
- **PartyB.js**: Displays the latest settlement amount and allows Party B to respond to the settlement (agree to it or dispute it).

**NOTE:**

- Navigate to [http://localhost:3001/partyA](http://localhost:3001/partyA) for Party A interface
- Navigate to [http://localhost:3001/partyB](http://localhost:3001/partyB) for Party B interface
