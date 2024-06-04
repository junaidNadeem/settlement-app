import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../common/helpers/toastOptions';
import { updateSettlementAmount } from '../common/queries/settlementQueries';
import { getLatestResponse } from '../common/queries/responseQueries';

function PartyA() {
  const [amount, setAmount] = useState('');
  const [latestResponse, setLatestResponse] = useState('');

  const handleUpdateAmount = async () => {
    try {
      const data = await updateSettlementAmount(amount);
      toast.success(data.message, toastOptions);
      fetchLatestResponse();
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred', toastOptions);
    }
  };

  const fetchLatestResponse = async () => {
    try {
      const data = await getLatestResponse();
      setLatestResponse(data.response);
    } catch (error) {
      toast.error('Error fetching latest response', toastOptions);
    }
  };

  const isResubmissionAllowed = () => {
    return latestResponse === 'disputed' || !latestResponse;
  };

  return (
    <div>
      <ToastContainer />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleUpdateAmount} disabled={!isResubmissionAllowed()}>Update Amount</button>
      <button onClick={fetchLatestResponse}>Fetch Latest Response</button>
      <p>Latest Response: {latestResponse ? latestResponse : "no response submitted yet"}</p>
      {!isResubmissionAllowed() && <p>Cannot resubmit amount as it is already settled.</p>}
    </div>
  );
}

export default PartyA;
