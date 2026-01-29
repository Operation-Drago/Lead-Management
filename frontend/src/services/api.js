import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token refresh on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);

                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: async (username, password) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
            username,
            password,
        });
        return response.data;
    },
};

// Lead APIs
export const leadAPI = {
    getAll: () => api.get('/leads/'),
    getById: (id) => api.get(`/leads/${id}/`),
    create: (data) => api.post('/leads/', data),
    update: (id, data) => api.patch(`/leads/${id}/`, data),
    delete: (id) => api.delete(`/leads/${id}/`),
};

export default api;
