import { ContactInfosModel } from "@entities";
import React, { createContext, useContext, useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import {
  getLocalContactInfos,
  removeLocalContactInfos,
  setLocalContactInfos,
} from "@network/services/localStorageService";
import { mapApiContactToModel } from "@network/mappers/contactInfosMapper";

const UserContext = createContext<
  | {
      contactInfos: ContactInfosModel | null;
      isLoading: boolean;
      setContactInfos: React.Dispatch<
        React.SetStateAction<ContactInfosModel | null>
      >;
    }
  | undefined
>(undefined);

export function useWebsiteProvider() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useWebsiteProvider must be used within a WebsiteProvider");
  }
  return context;
}

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const [contactInfos, setContactInfos] = useState<ContactInfosModel | null>(
    () => getLocalContactInfos()
  );
  const [isLoading, setIsLoading] = useState(true);

  // API مكافآت: لا يوجد GET contactInfos. نستخدم GET /api/web/home (Index Page) — إن كان الـ response يحتوي بيانات تواصل نستخرجها
  const {
    data: getContactResponse,
    isSuccess: isContactSuccess,
    isLoading: queryLoading,
  } = useGetQuery({
    endpoint: API_ENDPOINTS.web.home,
  });

  useEffect(() => {
    if (!queryLoading) setIsLoading(false);
  }, [queryLoading]);

  useEffect(() => {
    if (!isContactSuccess || !getContactResponse) return;

    const res = getContactResponse as unknown as Record<string, unknown>;
    const inner = res?.data as Record<string, unknown> | undefined;

    const fromObject = (
      obj: Record<string, unknown> | undefined
    ): unknown[] => {
      if (!obj || typeof obj !== "object") return [];
      const out: unknown[] = [];
      for (const [key, value] of Object.entries(obj)) {
        if (/contact/i.test(key) && value != null) out.push(value);
        if (key === "settings" && value && typeof value === "object") {
          const sub =
            (value as Record<string, unknown>).contact ??
            (value as Record<string, unknown>).contact_infos;
          if (sub) out.push(sub);
        }
      }
      return out;
    };

    const possibleSources: unknown[] = [
      inner?.contact_infos,
      inner?.contactInfos,
      inner?.contact_info,
      inner?.contact,
      (inner?.settings as Record<string, unknown>)?.contact,
      (inner?.settings as Record<string, unknown>)?.contact_infos,
      res.contact_infos,
      res.contactInfos,
      res.contact,
      ...fromObject(inner),
      ...fromObject(res),
      inner,
      res,
    ].filter(Boolean);

    const normalized = possibleSources.map((s) =>
      Array.isArray(s) && s.length > 0 ? s[0] : s
    );

    for (const raw of normalized) {
      const mapped = mapApiContactToModel(raw);
      if (mapped) {
        setContactInfos(mapped);
        break;
      }
    }
  }, [isContactSuccess, getContactResponse]);

  useEffect(() => {
    if (contactInfos) {
      setLocalContactInfos(JSON.stringify(contactInfos));
    } else {
      removeLocalContactInfos();
    }

    if (contactInfos !== null) {
      setIsLoading(false);
    }
  }, [contactInfos]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        contactInfos,
        setContactInfos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
