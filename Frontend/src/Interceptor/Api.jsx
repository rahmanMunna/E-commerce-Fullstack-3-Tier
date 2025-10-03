import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:44381/api/",
    headers: {
        "Content-Type": "application/json",
    },
    // If you use HttpOnly cookies:
    // withCredentials: true
});


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        // console.log(config)
        
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;
