import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:44381/api/",
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true
});


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        config.headers.Authorization = token
        // console.log(config)
        return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        // console.log(" Response:", response);
        return response;
    },
    (error) => {
        // console.error("Error:", error);
        return Promise.reject(error);
    }
);



export default api;
