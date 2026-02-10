/**
 * Mokafaat API Configuration
 * Base URL for all API requests - يمكن تغييره عبر .env (VITE_API_BASE_URL)
 */
export const API_BASE_URL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : "https://mokafat.ivadso.com";
