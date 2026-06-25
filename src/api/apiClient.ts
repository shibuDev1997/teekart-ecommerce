import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create Axios Instance
export const api = axios.create({
  baseURL: "https://dummyjson.com", // Base URL for standard APIs
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock request latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Request Interceptor: Attach token if exists
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Add mock latency to simulate real network requests
    await delay(300);

    const token = localStorage.getItem("teekart-token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors and format responses
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[API RESPONSE] ${response.status} <- ${response.config.url}`);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    
    // Auto-retry mechanism (up to 3 times) for 5xx errors or network failures
    if (originalRequest && !originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    if (
      originalRequest &&
      originalRequest._retryCount < 2 &&
      (error.code === "ECONNABORTED" || !error.response || (error.response.status >= 500))
    ) {
      originalRequest._retryCount += 1;
      console.warn(`[API RETRY] Retrying request (${originalRequest._retryCount}/2): ${originalRequest.url}`);
      await delay(1000); // Wait before retrying
      return api(originalRequest);
    }

    // Global Error Handling
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      const errorMessage = data?.message || `Request failed with status ${status}`;
      console.error(`[API RESPONSE ERROR] ${status}: ${errorMessage}`);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      console.error("[API NETWORK ERROR] No response received from server.");
      return Promise.reject(new Error("Network connection error. Please check your internet."));
    } else {
      console.error("[API SETUP ERROR]", error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);
