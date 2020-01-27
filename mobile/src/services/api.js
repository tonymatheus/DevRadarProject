import axios from 'axios';

const api = axios.create({
    baseURL: 'https://10.0.0.102:3333' ,
});

export default api;