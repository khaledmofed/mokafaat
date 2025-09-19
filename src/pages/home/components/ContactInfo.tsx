import ContactCard from "./ContactCard";
import { PiTimerBold } from "react-icons/pi";
import { t } from "i18next";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ContactInfo = (props: { mobileNumber?: string; email?: string }) => {
  return (
    <section className="contact-info overflow-hidden bg-gradient-to-l from-primary to-secondary py-8 px-6 lg:py-10 lg:px-8">
      <div className="grid md:grid-cols-3 gap-3 max-w-screen-xl mx-auto">
        <ContactCard
          Icon={PiTimerBold}
          FirstText={t("days")}
          SecondText={t("home.contact.hours")}
        />
        <ContactCard
          Icon={FaPhone}
          FirstText={t("mobileTitle")}
          SecondText={props?.mobileNumber || ""}
        />
        <ContactCard
          Icon={MdEmail}
          FirstText={t("emailTitle")}
          SecondText={props?.email || ""}
        />
      </div>
    </section>
  );
};

export default ContactInfo;
