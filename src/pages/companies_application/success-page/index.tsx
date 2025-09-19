import { ChangePageTitle } from "@components";
import { useIsRTL } from "@hooks";
import { t } from "i18next";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const CompanyApplicationSuccessPage = () => {
  ChangePageTitle({
    pageTitle: t("company-application.success"),
    description: "",
  });

  const isRTL = useIsRTL();

  return (
    <div
      className="md:p-10 p-6 md:m-10 m-5 border border-gray-100 rounded-lg
flex flex-col justify-center items-center gap-6 text-center"
    >
      <FaEnvelopeCircleCheck className="text-5xl text-success" />
      <h1 className="font-bold text-4xl text-title">
        {t("company-application.thank-you")}
      </h1>
      <p className="text-sm text-sub-title leading-8 max-w-screen-md">
        {isRTL ? (
          <>
            تم إرسال طلبك بنجاح. فريقنا متحمس لمراجعة تفاصيل طلبك وسيتواصل معك
            قريباً لمناقشة احتياجاتك للفعالية. <br /> إذا كانت لديك أي استفسارات
            عاجلة أو تحتاج إلى مساعدة إضافية، لا تتردد في الاتصال بنا
            <br /> على{" "}
            <strong className="text-primary">info@mukafaat.co</strong> أو
            الاتصال بنا على{" "}
            <strong className="text-primary" dir="ltr">
              +966 538 771 712
            </strong>
            . <br />
            نتطلع إلى العمل معك لجعل فعاليتك القادمة استثنائية!
          </>
        ) : (
          <>
            Your request has been successfully submitted. Our team at Event
            Masters SA is excited to review your details and will get back to
            you shortly to discuss your event needs. In the meantime, if you
            have any urgent questions or need further assistance, please don’t
            hesitate to contact us at <br />{" "}
            <strong className="text-primary">info@mukafaat.co</strong> or call
            us at
            <strong className="text-primary">+966 538 771 712</strong>.
          </>
        )}
      </p>
    </div>
  );
};

export default CompanyApplicationSuccessPage;
