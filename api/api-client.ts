import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});



const refreshToken = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_AUTH_ROUTE}/auth/refresh`, {}, { withCredentials: true })
}

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const headers = { ...originalRequest.headers }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshToken();

            return api(originalRequest, { headers });
        }
        else {
            return Promise.reject(error);
        }
    }
)


