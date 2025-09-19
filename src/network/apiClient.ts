import axios from "axios";

// Get API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in production (Vercel)
  if (window.location.hostname === "events-master.vercel.app") {
    console.log(
      "🚀 Production Environment (Vercel) - Using API:",
      "https://api.staging.eventmasters.co"
    );
    return "https://api.staging.eventmasters.co";
  }

  // Check if we're in staging
  if (window.location.hostname === "staging.eventmasters.co") {
    console.log(
      "🔧 Staging Environment - Using API:",
      "https://api.staging.eventmasters.co"
    );
    return "https://api.staging.eventmasters.co";
  }

  // Check if we're in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    console.log(
      "💻 Development Environment - Using API:",
      "https://api.staging.eventmasters.co"
    );
    return "https://api.staging.eventmasters.co";
  }

  // Default fallback
  console.log(
    "⚠️ Unknown Environment - Using Default API:",
    "https://api.staging.eventmasters.co"
  );
  return "https://api.staging.eventmasters.co";
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);
