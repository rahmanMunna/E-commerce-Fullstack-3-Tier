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


// api.interceptors.response.use(
//     response => {
//         console.log(response.data)
//         return response;
//     },
//     // error => {
//     //     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//     //         console.log(error.status)
//     //         console.log(error.response.data)
//     //         window.location.href = "/login";
//     //     }
//     //     return Promise.reject(error);
//     // }
// );

export default api;
