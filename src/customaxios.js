import './axios';
import axios from 'axios';

const imageAPI = axios.interceptors.request.use((request) => {
  request.headers = {
    Accept: 'application/json',
    'Content-type': 'image',
  };
});

export default imageAPI;
