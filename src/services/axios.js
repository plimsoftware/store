import axios from 'axios';

export default axios.create({
  // baseURL: 'https://escolaapi.plimsoftware.pt',
  baseURL: 'http://localhost:3001',
  localhost: 3001,
});
