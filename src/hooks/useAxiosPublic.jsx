import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://scholarship-portalbd-server.vercel.app",
    timeout: 10000, // 10s timeout
});

// Optional: simple response interceptor to log network errors
axiosPublic.interceptors.response.use(
    (res) => res,
    (err) => {
        // Keep the error for callers, but add a hint in console for network-level failures
        if (err.code === 'ECONNABORTED' || err.message === 'Network Error') {
            console.warn('Axios network-level error or timeout:', err.message);
        }
        return Promise.reject(err);
    }
);

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;