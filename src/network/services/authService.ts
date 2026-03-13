import { api } from "@network/apiClient";
import { API_ENDPOINTS } from "@network/apiEndpoints";

export interface SendOtpParams {
  phone: string;
  country_code?: string;
  type?: "sms" | "whatsapp";
}

export interface VerifyOtpParams {
  phone: string;
  country_code?: string;
  otp_code: string;
}

/** مطابقة لـ complete-profile في الباكند */
export interface CompleteProfileParams {
  first_name: string;
  last_name: string;
  id_number: string;
  phone: string;
  country_code: string;
  email: string;
  city_id: string | number;
  gender: string;
  avatar?: File | null;
}

export const authService = {
  sendOtp: (params: SendOtpParams) => {
    const { phone, country_code = "966", type = "sms" } = params;
    return api.post(API_ENDPOINTS.auth.sendOtp, null, {
      params: { phone, country_code, type },
    });
  },

  verifyOtp: (params: VerifyOtpParams) => {
    const { phone, country_code = "966", otp_code } = params;
    return api.post(API_ENDPOINTS.auth.verifyOtp, null, {
      params: { phone, country_code, otp_code },
    });
  },

  logout: () => api.post(API_ENDPOINTS.auth.logout),

  completeProfile: (data: CompleteProfileParams) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("id_number", data.id_number);
    formData.append("phone", data.phone);
    formData.append("country_code", String(data.country_code));
    formData.append("email", data.email);
    formData.append("city_id", String(data.city_id));
    formData.append("gender", data.gender);
    if (data.avatar && data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }
    return api.post(API_ENDPOINTS.auth.completeProfile, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  setLocation: (latitude: number, longitude: number) =>
    api.post(API_ENDPOINTS.auth.setLocation, null, {
      params: { latitude, longitude },
    }),

  setInterests: (categoryIds: number[]) =>
    api.post(API_ENDPOINTS.auth.setInterests, null, {
      params: { "category_ids[]": categoryIds },
    }),
};
