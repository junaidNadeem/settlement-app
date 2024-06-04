import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../common/helpers/toastOptions';
import { getLatestSettlement } from '../common/queries/settlementQueries';
import { submitResponse } from '../common/queries/responseQueries';

function PartyB() {
  const [latestSettlement, setLatestSettlement] = useState(null);

  useEffect(() => {
    const fetchLatestSettlement = async () => {
      try {
        const data = await getLatestSettlement();
        setLatestSettlement(data);
      } catch (error) {
        toast.error('Failed to fetch the latest settlement.', toastOptions);
      }
    };

    fetchLatestSettlement();

    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        fetchLatestSettlement();
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleRespond = async (response) => {
    try {
      const data = await submitResponse(response);
      toast.success(data.message, toastOptions);
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred', toastOptions);
    }
  };

  return (
    <div>
      <ToastContainer />
      {!latestSettlement && <div>No Amount submitted by Party A</div>}
      {latestSettlement && (
        <div>
          <p>Amount: ${latestSettlement.amount}</p>
          <button onClick={() => handleRespond('agreed')}>Agree</button>
          <button onClick={() => handleRespond('disputed')}>Dispute</button>
        </div>
      )}
    </div>
  );
}

export default PartyB;
