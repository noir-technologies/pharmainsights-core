import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5229/api',
});

export default apiClient;
