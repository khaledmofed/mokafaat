import { PrimaryGradientButton } from "@components";
import { t } from "i18next";

export const SubmitButton = ({ isLoading, handleSubmit }: any) => (
  <PrimaryGradientButton
    type="button"
    visibility="flex"
    className="font-bold w-full"
    isLoading={isLoading}
    onClick={handleSubmit}
  >
    {t("rating.submit")}
  </PrimaryGradientButton>
);
