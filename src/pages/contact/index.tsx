import { PageHeader } from "@components";
import { ContactForm } from "./components";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { Layer, UnderTitle } from "@assets";
import useIsRTL from "@hooks/useIsRTL";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";

type ContactConfig = {
  data?: {
    config?: {
      contact?: {
        address?: string;
        email?: string;
        phone?: string;
        whatsapp?: string;
        working_hours?: string;
      };
    };
  };
};

function ContactPage() {
  const isRTL = useIsRTL();
  const { data: appConfig } = useAppConfig() as { data?: ContactConfig };
  const contact = appConfig?.data?.config?.contact;
  // ChangePageTitle({
  //   pageTitle: t("home.navbar.contact"),
  //   path: APP_ROUTES.contact,
  //   description:
  //     "Get in touch with Mukafaat. We're here to assist you with any inquiries, feedback, or support you need. Contact us today!",
  // });
  return (
    <>
      <Helmet>
        <title>{t("home.navbar.contact")}</title>
        <link rel="canonical" href="https://mukafaat.com/contact" />
        <meta
          name="description"
          content={
            isRTL
              ? "تواصل مع مكافئات. نحن هنا لمساعدتك في أي استفسارات أو ملاحظات أو دعم تحتاجه. اتصل بنا اليوم!"
              : "Get in touch with Mukafaat. We're here to assist you with any inquiries, feedback, or support you need. Contact us today!"
          }
        />
        <meta property="og:title" content={t("home.navbar.contact")} />
        <meta
          property="og:description"
          content={
            isRTL
              ? "تواصل مع مكافئات. نحن هنا لمساعدتك في أي استفسارات أو ملاحظات أو دعم تحتاجه. اتصل بنا اليوم!"
              : "Get in touch with Mukafaat. We're here to assist you with any inquiries, feedback, or support you need. Contact us today!"
          }
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        <PageHeader
          title="contact.title"
          description={
            isRTL
              ? "تواصل مع مكافئات. نحن هنا لمساعدتك في أي استفسارات أو ملاحظات أو دعم تحتاجه. اتصل بنا اليوم!"
              : "Get in touch with Mukafaat. We're here to assist you with any inquiries, feedback, or support you need. Contact us today!"
          }
        />

        <div className="bg-white pb-6">
          <div className="contact-us container bg-white  mx-auto w-full">
            <div className="flex lg:flex-row flex-col gap-4 items-start justify-start mb-8 mt-0">
              <ContactForm />
              <div className="lg:w-1/3 w-full gap-6 flex flex-col">
                <div className="space-y-6 container px-4 mx-auto mb-0">
                  {/* Contact Info Section */}
                  <div className="bg-[#400198] rounded-3xl p-8 text-white h-[469px] overflow-hidden relative">
                    {/* Header */}
                    <div className="text-start gap-2 mb-4">
                      <span
                        className="text-[#fff] text-md font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL
                            ? "Readex Pro, sans-serif"
                            : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "اتصل بنا" : "Contact Us"}
                      </span>
                      <img
                        src={UnderTitle}
                        alt="underlineDecoration"
                        className="h-1 mt-2 brightness-0 invert"
                      />
                    </div>

                    {/* Contact Methods - من /api/app-config (config.contact) */}
                    <div className="space-y-6">
                      {/* Visit Office */}
                      {contact?.address && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#ffffff] rounded-full border-2 border-[#400198] flex items-center justify-center flex-shrink-0">
                            <IoLocationOutline className="text-[#400198] text-xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">
                              {isRTL ? "زيارة مكتب" : "Visit A Office"}
                            </h3>
                            <p className="text-white/90 text-sm leading-relaxed">
                              {contact.address}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Make Call */}
                      {(contact?.phone ?? contact?.whatsapp) && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#ffffff] rounded-full border-2 border-[#400198] flex items-center justify-center flex-shrink-0">
                            <FiPhone className="text-[#400198] text-xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">
                              {isRTL ? "اتصال" : "Make A Call"}
                            </h3>
                            <div className="space-y-1">
                              {contact.phone && (
                                <p className="text-white/90 text-sm">
                                  {isRTL ? "اتصال: " : "Call : "}
                                  {contact.phone}
                                </p>
                              )}
                              {contact.whatsapp && contact.whatsapp !== contact.phone && (
                                <p className="text-white/90 text-sm">
                                  {isRTL ? "واتساب: " : "WhatsApp : "}
                                  {contact.whatsapp}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Send Mail */}
                      {contact?.email && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#ffffff] rounded-full border-2 border-[#400198] flex items-center justify-center flex-shrink-0">
                            <IoMailOutline className="text-[#400198] text-xl" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-2">
                              {isRTL ? "إرسال بريد" : "Send Mail"}
                            </h3>
                            <p className="text-white/90 text-sm">
                              {contact.email}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`absolute  transform ${
                        isRTL ? "left-0" : "right-0"
                      } z-0`}
                    >
                      <img
                        src={Layer}
                        alt="Layer Pattern"
                        className="w-full h-auto animate-float"
                      />
                    </div>
                  </div>
                </div>
                {/* <ContactInfo />
            <CompanyLocationOnMap /> */}
              </div>
            </div>

            {/* Additional Map Section */}
            <div className="flex lg:flex-row flex-col gap-4 items-start justify-start mb-12 mt-0">
              <div className="w-full">
                <div className="bg-white   border border-gray-100 ">
                  {/* Map Container */}
                  <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.123456789!2d46.687410!3d24.694560!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzQwLjQiTiA0NsKwNDEnMTQuNyJF!5e0!3m2!1sen!2ssa!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mukafaat Office Location - Riyadh"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
