import { ContactInfosModel } from "@entities";
import React, { createContext, useContext, useEffect, useState } from "react";
import useGetQuery from "./api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import {
  removeLocalContactInfos,
  setLocalContactInfos,
} from "@network/services/localStorageService";

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
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const { data: getContactResponse, isSuccess: isContactSuccess } = useGetQuery(
    {
      endpoint: API_ENDPOINTS.getContactInfos,
    }
  );

  useEffect(() => {
    const contactData = getContactResponse?.data?.contactInfos ?? null;
    if (isContactSuccess && getContactResponse?.status && contactData) {
      setContactInfos(contactData);
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
