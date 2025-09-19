import { AboutPattern } from "@assets";
import { useIsRTL } from "@hooks";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useInquiryModal } from "@context";

const ServiceHero = () => {
  // const [t] = useTranslation();
  const isRTL = useIsRTL();
  const { openModal } = useInquiryModal();
  const titleFontType = useIsRTL()
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <section className="relative w-full bg-[#1D0843]  overflow-hidden min-h-[100px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30"></div>
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {isRTL ? "الخدمات" : "Services"}
        </h1>

        <div
          className="flex items-center justify-center space-x-2 text-sm md:text-base wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <Link
            to="/"
            className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
          >
            {isRTL ? "الرئيسية" : "Home"}
          </Link>
          <span className="text-white text-xs">|</span>
          <span className="text-purple-300 font-medium text-xs">
            {isRTL ? "الخدمات" : "Services"}
          </span>
        </div>

        {/* Inquiry Button */}
        <div className="mt-6 wow fadeInUp" data-wow-delay="0.4s">
          <button
            onClick={() => {
              console.log("Service Hero button clicked!");
              openModal(
                "Service Inquiry",
                "Get in touch to learn more about our services"
              );
            }}
            className="bg-white text-[#1D0843] hover:bg-gray-100 transition-colors px-6 py-3 rounded-full font-semibold text-sm"
          >
            {isRTL ? "استفسر الآن" : "Inquire Now"}
          </button>
        </div>
      </div>
      <div className={`absolute -bottom-10  transform z-9`}>
        <img
          src={AboutPattern}
          alt="App Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

export default ServiceHero;
