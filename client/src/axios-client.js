import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');

    if (!config.headers) {
        config.headers = {};
    }
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;

    if (response && response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
    }

    throw error;
})

export default axiosClient;