import axios from "axios";

export const SaveTokens = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
};

export const GetAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const GetRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const axiosRequest = axios.create({
    baseURL: "http://157.180.29.248:8070",
});

axiosRequest.interceptors.request.use(
    (config) => {
        const token = GetAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosRequest.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = GetRefreshToken();
            if (refreshToken) {
                try {
                    const res = await axios.post("http://157.180.29.248:8070/auth/token/refresh/", {
                        refresh: refreshToken,
                    });

                    const newAccess = res.data.access;
                    const newRefresh = res.data.refresh ?? refreshToken;

                    SaveTokens(newAccess, newRefresh);

                    originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                    return axiosRequest(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error);
    }
);