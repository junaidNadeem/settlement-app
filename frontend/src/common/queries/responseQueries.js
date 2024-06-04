import axios from 'axios';

export const getLatestResponse = async () => {
  const response = await axios.get('http://localhost:3000/response/latest');
  return response.data;
};

export const submitResponse = async (response) => {
  const res = await axios.post('http://localhost:3000/response/submit', { response });
  return res.data;
};
