import { ContactInfoItem, SocialMediaButton } from "@components";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { t } from "i18next";
import { useWebsiteProvider } from "@hooks";

const ContactInfo = () => {
  const { contactInfos } = useWebsiteProvider();

  return (
    <div className="contact-form border border-gray-200 p-8 rounded-lg w-full gap-10 flex flex-col">
      <div className="days-hours wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="text-sm text-title mb-2">{t("home.contact.hours")}</h6>
        <h6 className="text-sm text-title">{t("home.contact.days")}</h6>
      </div>

      <div
        className="flex flex-col items-start text-sm gap-5 wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <ContactInfoItem
          to={`tel:${contactInfos?.mobileNumber}`}
          icon={FaPhone}
          text={contactInfos?.mobileNumber || ""}
        />

        <ContactInfoItem
          to={`mailto:${contactInfos?.email}`}
          icon={MdOutlineEmail}
          text={contactInfos?.email || ""}
        />

        <ContactInfoItem
          to=""
          icon={GrLocation}
          text={contactInfos?.location || ""}
        />
      </div>

      <div
        className="flex gap-2 mt-4 md:mt-0 wow fadeInUp"
        data-wow-delay="0.3s"
      >
        <SocialMediaButton
          to={contactInfos?.linkedInUrl || ""}
          icon={FaLinkedinIn}
        />
        <SocialMediaButton
          to={contactInfos?.instagramUrl || ""}
          icon={FaInstagram}
        />
        <SocialMediaButton
          to={contactInfos?.whatsappNumber || ""}
          icon={FaWhatsapp}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
