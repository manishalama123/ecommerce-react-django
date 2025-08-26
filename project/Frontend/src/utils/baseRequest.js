import axios from "axios"
import {store} from '../redux/store/store.js'

export const baseRequest = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
})

// Get token from localStorage (Redux Persist stores it there)
// baseRequest.interceptors.request.use(
//     (config) =>{
//         const token = localStorage.getItem('authToken');//accessing token from auth state
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`
//             console.log('Added Authorization header');
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// )