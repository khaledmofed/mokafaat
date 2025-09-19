import { FormInputGroup, PhoneNumberInput } from "@components";
import { CompanyInformationProps } from "@interfaces";
import { t } from "i18next";

const CompanyInformation = ({
  register,
  control,
  errors,
}: CompanyInformationProps) => {
  return (
    <div className="flex flex-col border rounded-lg">
      <h1 className="font-bold border-b p-4 bg-gray-50 rounded-tr-lg rounded-tl-lg">
        {t("company-application.company-info")}
      </h1>

      <div className="grid lg:grid-cols-2 gap-2 p-4">
        <FormInputGroup
          label={t("company-application.company-name")}
          id="company-name"
          placeholder={t("company-application.company-name")}
          register={register("companyName")}
          error={errors?.companyName?.message}
        />
        <FormInputGroup
          label={t("company-application.cr-no")}
          id="cr-no"
          placeholder={t("company-application.cr-no")}
          register={register("crNumber")}
          error={errors?.crNumber?.message}
        />
        <FormInputGroup
          label={t("company-application.vat-no")}
          id="vat-no"
          placeholder={t("company-application.vat-no")}
          register={register("vatNumber")}
          error={errors?.vatNumber?.message}
        />
        <FormInputGroup
          label={t("company-application.contact-name")}
          id="contact-name"
          placeholder={t("company-application.contact-name")}
          register={register("contactName")}
          error={errors?.contactName?.message}
        />
        <FormInputGroup
          label={t("company-application.contact-email")}
          id="contact-email"
          placeholder={t("company-application.contact-email")}
          register={register("contactEmail")}
          error={errors?.contactEmail?.message}
          type="email"
        />

        <PhoneNumberInput
          label={t("company-application.contact-mobile")}
          control={control}
          name="contactMobile"
          error={errors?.contactMobile?.message}
        />
      </div>
    </div>
  );
};

export default CompanyInformation;
