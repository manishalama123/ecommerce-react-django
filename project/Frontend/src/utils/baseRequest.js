import axios from "axios"

export const baseRequest = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
})

// Get token from localStorage (Redux Persist stores it there)
baseRequest.interceptors.request.use((config) => {
    const persistedState = localStorage.getItem('persistroot');
    
    if (persistedState) {
        try {
            const parsedState = JSON.parse(persistedState);
            const token = parsedState.auth?.access;
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error getting token:', error);
        }
    }
    
    return config;
});
