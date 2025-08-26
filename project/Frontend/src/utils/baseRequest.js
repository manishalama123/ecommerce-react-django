import axios from "axios"
import {store} from '../redux/store/store.js'

export const baseRequest = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
})

baseRequest.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('authToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)