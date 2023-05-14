import axios from "axios";
import { HTTP } from "../data/HttpConfig";

// Different than a default axios client, use when you need to make an authenticated request
export function fetchClient() {
    const defaultOptions = {
        baseUrl: HTTP.dev.BASE_URL,
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

