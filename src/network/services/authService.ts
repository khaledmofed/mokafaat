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

export interface CompleteProfileParams {
  name: string;
  email: string;
  account_type: "individual" | "company";
  company_id?: string;
  job_title?: string;
  avatar?: File;
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
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("account_type", data.account_type);
    if (data.company_id) formData.append("company_id", data.company_id);
    if (data.job_title) formData.append("job_title", data.job_title);
    if (data.avatar) formData.append("avatar", data.avatar);
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
