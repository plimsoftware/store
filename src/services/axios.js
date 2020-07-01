import axios from 'axios';

export default axios.create({
  baseURL: 'https://storeapi.plimsoftware.pt',
  localhost: 3001,
});
