import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    },
});

// 🔐 Auto attach Game Access Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("game_access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
