import { t } from "i18next";
import { IconType } from "react-icons";

const ContactCard = (props: {
  Icon: IconType;
  FirstText: string;
  SecondText: string;
}) => {
  const { Icon, FirstText, SecondText } = props;
  return (
    <div
      className="contact-card flex items-center gap-3 md:justify-center wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <div className="icon bg-white bg-opacity-20 text-white p-4 rounded-md">
        <Icon className="text-2xl" />
      </div>
      <div className="flex flex-col gap-2 text-white text-sm">
        <span>{t(`home.contact.${FirstText}`)}</span>
        <span dir={`${(FirstText == "mobileTitle" && "ltr") || "rtl"}`}>
          {SecondText}
        </span>
      </div>
    </div>
  );
};

export default ContactCard;
