import { AboutUsModel, ContactInfosModel } from "@entities";

export const setLocalAboutUs = (aboutUs: string): void => {
  localStorage.setItem("aboutUs", aboutUs);
};

export const setLocalContactInfos = (contactInfos: string): void => {
  localStorage.setItem("contactInfos", contactInfos);
};

export const getLocalAboutUs = (): AboutUsModel | null => {
  const aboutUs = localStorage.getItem("aboutUs");
  return aboutUs !== null ? JSON.parse(aboutUs) : null;
};

export const getLocalContactInfos = (): ContactInfosModel | null => {
  const contactInfos = localStorage.getItem("contactInfos");
  return contactInfos !== null ? JSON.parse(contactInfos) : null;
};

export const removeLocalAboutUs = (): void => {
  localStorage.removeItem("aboutUs");
};

export const removeLocalContactInfos = (): void => {
  localStorage.removeItem("contactInfos");
};
