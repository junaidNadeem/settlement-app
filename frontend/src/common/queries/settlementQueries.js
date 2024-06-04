import axios from 'axios';

export const updateSettlementAmount = async (amount) => {
  const response = await axios.post('http://localhost:3000/settlement/update', { amount });
  return response.data;
};

export const getLatestSettlement = async () => {
  const response = await axios.get('http://localhost:3000/settlement/latest');
  return response.data;
};
