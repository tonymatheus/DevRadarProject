import axios from 'axios';

const api = axios.create({
    baseURL: 'https://192.168.43.112:3333' ,
});

export default api;