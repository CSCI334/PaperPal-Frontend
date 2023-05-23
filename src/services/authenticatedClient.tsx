import axios from "axios";
import { baseUrl } from "../data/HttpConfig";

// Different than a default axios client, use when you need to make an authenticated request
export function authenticatedClient() {
    const defaultOptions = {
        baseURL: baseUrl,
        headers: {
            'Content-Type': "application/json",
        }
    }
    let instance = axios.create(defaultOptions)
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('jwtToken');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance
}

