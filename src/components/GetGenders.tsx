import { GenderModel } from "@entities";
import { t } from "i18next";

export const GetGenders = () => {
  const genderOptions: GenderModel[] = [
    {
      id: 1,
      title: t("genders.male"),
    },
    {
      id: 2,
      title: t("genders.female"),
    },
  ];

  return genderOptions;
};
