import {
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import SocialMediaButton from "./SocialMediaButton";
import ContactInfoItem from "./ContactInfoItem";
import { useWebsiteProvider } from "@hooks";

const TopNav = () => {
  const { contactInfos } = useWebsiteProvider();

  return (
    <div className="bg-primary w-full text-white hidden md:flex">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-2">
        <div
          className="flex flex-col md:flex-row items-start md:items-center text-xs space-y-4 md:space-y-0 md:gap-4 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          {contactInfos?.mobileNumber && (
            <ContactInfoItem
              to={`tel:${contactInfos.mobileNumber}`}
              icon={FaPhone}
              text={contactInfos.mobileNumber}
            />
          )}
          {contactInfos?.email && (
            <ContactInfoItem
              to={`mailto:${contactInfos.email}`}
              icon={MdOutlineEmail}
              text={contactInfos.email}
            />
          )}
          {contactInfos?.location && (
            <ContactInfoItem
              to=""
              icon={GrLocation}
              text={contactInfos.location}
            />
          )}
        </div>

        <div
          className="flex gap-2 mt-4 md:mt-0 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          {contactInfos?.linkedInUrl && (
            <SocialMediaButton
              to={contactInfos.linkedInUrl}
              icon={FaLinkedinIn}
            />
          )}
          {contactInfos?.instagramUrl && (
            <SocialMediaButton
              to={contactInfos.instagramUrl}
              icon={FaInstagram}
            />
          )}
          {contactInfos?.whatsappNumber && (
            <SocialMediaButton
              to={
                contactInfos.whatsappNumber.startsWith("http")
                  ? contactInfos.whatsappNumber
                  : `https://wa.me/${contactInfos.whatsappNumber.replace(
                      /\D/g,
                      ""
                    )}`
              }
              icon={FaWhatsapp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
