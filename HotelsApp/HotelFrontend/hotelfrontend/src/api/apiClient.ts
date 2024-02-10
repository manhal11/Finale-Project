import axios, { AxiosRequestConfig } from "axios";
import { RootState, store } from "../redux/store";

export const CONNECTION_ERROR_MESSAGE = "Failed to connect to server. ";

export const apiClient = axios.create({
    baseURL: 'https://localhost:7273/api', // Change in production
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = store.getState()?.auth?.jwtToken;
    if (token && config?.headers) {
        config.headers["authorization"] = "Bearer " + token;
    }
    return config;
});