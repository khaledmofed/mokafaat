import { IDType } from "@interfaces";
import { t } from "i18next";

export const IDTypes = () => {
  const types: IDType[] = [
    {
      id: 1,
      type: t("id-type.national"),
    },
    {
      id: 2,
      type: t("id-type.passport"),
    },
    {
      id: 3,
      type: t("id-type.residence"),
    },
  ];

  return types;
};
