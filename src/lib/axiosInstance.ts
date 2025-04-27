import axios from "axios";

// Custom axios instance
const axiosInstance = axios.create({
  baseURL: "https://mustafocoder.pythonanywhere.com/",
});

// Request interceptor
axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          const res = await axios.post(
            "https://mustafocoder.pythonanywhere.com/api/token/refresh/",
            { refresh: refresh_token }
          );

          const { access } = res.data;
          localStorage.setItem("token", access);

          axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);
          localStorage.clear(); // logout
          window.location.href = "/login"; // userni login sahifaga qaytaramiz
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
