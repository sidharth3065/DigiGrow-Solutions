import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { NativeModules, Platform } from "react-native";

type ExpoGoConfig = {
  debuggerHost?: string | null;
};

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function extractHost(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value
    .trim()
    .replace(/^exp:\/\//, "http://")
    .replace(/^exps:\/\//, "https://")
    .replace(/^https?:\/\//, "");

  const host = normalized.split("/")[0]?.split(":")[0];
  return host || null;
}

function getRuntimeHost() {
  const expoGoConfig = Constants.expoGoConfig as ExpoGoConfig | null;
  const manifest2HostUri =
    (Constants.manifest2 as { extra?: { expoClient?: { hostUri?: string } } } | null)?.extra
      ?.expoClient?.hostUri ?? null;
  const scriptUrl =
    (NativeModules.SourceCode as { scriptURL?: string } | undefined)?.scriptURL ?? null;

  const candidates = [
    Constants.expoConfig?.hostUri,
    expoGoConfig?.debuggerHost,
    manifest2HostUri,
    Constants.linkingUri,
    Constants.experienceUrl,
    scriptUrl,
  ];

  for (const candidate of candidates) {
    const host = extractHost(candidate);
    if (host && host !== "localhost" && host !== "127.0.0.1") {
      return host;
    }
  }

  return null;
}

function getDevApiBaseUrl() {
  const explicitBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (explicitBaseUrl) {
    return stripTrailingSlash(explicitBaseUrl);
  }

  const host = getRuntimeHost();
  if (host) {
    return `http://${host}:3000/api`;
  }

  return Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";
}

const getBaseUrl = () => {
  if (__DEV__) {
    return getDevApiBaseUrl();
  }

  // Production URL would go here
  return "https://digigrow.app/api";
};

const baseURL = getBaseUrl();

if (__DEV__) {
  console.log("[api] Using base URL:", baseURL);
}

export const api = axios.create({
  baseURL,
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
