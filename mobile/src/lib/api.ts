import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Use 10.0.2.2 for Android Emulator connecting to host machine's localhost
// Modify this to your PC's local IP (e.g., 192.168.1.X) if testing on a physical device over WiFi
const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === "android"
      ? "http://10.0.2.2:3000/api"
      : "http://localhost:3000/api";
  }
  // Production URL would go here
  return "https://digigrow.app/api";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
