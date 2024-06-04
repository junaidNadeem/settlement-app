import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PartyA from "./pages/partyA";
import PartyB from "./pages/partyB";

function App() {
  return (
    <Router>
      <div className="App">
        <center>
          <h1>Settlement System</h1>
          <div style={{ marginTop: 20 }}>
            <Routes>
              <Route path="/partya" element={<PartyA />} />
              <Route path="/partyb" element={<PartyB />} />
            </Routes>
          </div>
        </center>
      </div>
    </Router>
  );
}

export default App;
