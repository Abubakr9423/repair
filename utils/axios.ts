import axios from "axios";

export const SaveToken = (token: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("token", token);
};

export const GetToken = () => {
    return (
        localStorage.getItem("authToken"),
        localStorage.getItem("token")
    );
};

export const axiosRequest = axios.create({
    baseURL: "http://157.180.29.248:8070"
});

axiosRequest.interceptors.request.use(
    (config) => {
        const token = GetToken();

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config;
    },
    (error) => Promise.reject(error)
);