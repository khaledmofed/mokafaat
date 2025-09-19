import {
  A3,
  UnderTitle,
  WorldwidePropertiesPattern,
  WorldwidePropertiesplaneVector,
} from "@assets";
import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";

const AboutComponent: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  return (
    <>
      <section className="pb-0 pt-10 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left Section - Image Collage */}
            <div className="relative">
              {/* Top Image */}
              <div className="relative mb-8 pe-0 lg:pe-10">
                <img
                  src={A3}
                  alt={t("worldwideProperties.modernBuilding")}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Section - Content */}
            <div className="space-y-4">
              {/* Subtitle */}
              <div className="text-start mb-0">
                <div className="text-start gap-2 mb-3">
                  <span
                    className="text-[#fd671a] text-md font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {isRTL ? "من نحن" : "WHO WE ARE"}
                  </span>
                  <img
                    src={UnderTitle}
                    alt="underlineDecoration"
                    className="h-1 mt-2"
                  />
                </div>
                <h2
                  className="text-[#400198] text-3xl font-bold"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "منصة مكافئات" : "Mukafaat Platform"}
                </h2>
              </div>

              {/* Description */}
              <p
                className="text-md leading-relaxed text-gray-700 mb-8"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "منصة مكافئات هي المنصة الرائدة في المملكة العربية السعودية لتوفير المال والاستفادة من أفضل العروض والخصومات. نحن نقدم مجموعة شاملة من الخدمات المالية والسياحية، بما في ذلك بطاقات الائتمان من أفضل البنوك، كوبونات خصم حصرية، وحجوزات فندقية وطيران بأسعار مميزة. نعمل مع أفضل الشركاء في السوق السعودي لتقديم عروض حصرية ومميزة، ونساعد عملائنا على توفير المال في كل عملية شراء أو حجز."
                  : "Mukafaat is the leading platform in Saudi Arabia for saving money and benefiting from the best offers and discounts. We provide a comprehensive range of financial and tourism services, including credit cards from top banks, exclusive discount coupons, and hotel and flight bookings at competitive prices. We work with the best partners in the Saudi market to provide exclusive and special offers, helping our clients save money on every purchase or booking."}
              </p>

              {/* Our Vision Section */}
              <div className="mb-8">
                <div className="text-start gap-2 mb-4">
                  <span
                    className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {isRTL ? "رؤيتنا" : "Our Vision"}
                  </span>
                  <img
                    src={UnderTitle}
                    alt="underlineDecoration"
                    className="h-1 mt-2"
                  />
                </div>
                <p
                  className="text-md leading-relaxed text-gray-700"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL
                    ? "نحن نؤمن بأن التوفير الذكي هو حق لكل فرد في المملكة العربية السعودية. نسعى لأن نكون المنصة الأولى التي تساعد المواطنين والمقيمين على توفير المال والاستفادة من أفضل العروض المتاحة. هدفنا هو جعل التوفير أمراً سهلاً ومتاحاً للجميع، من خلال توفير أفضل الخدمات المالية والسياحية في مكان واحد."
                    : "We believe that smart saving is a right for every individual in Saudi Arabia. We strive to be the first platform that helps citizens and residents save money and benefit from the best available offers. Our goal is to make saving easy and accessible to everyone, by providing the best financial and tourism services in one place."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute bottom-20 w-1/3 sm:w-1/2 ${
            isRTL ? "left-0" : "right-0"
          } z-0 hidden sm:block`}
        >
          <img
            src={WorldwidePropertiesPattern}
            alt={t("worldwideProperties.appPattern")}
            className="h-auto animate-float"
          />
        </div>

        <div
          className={`absolute bottom-0 w-[20%] sm:w-[20%] ${
            isRTL ? "left-0" : "right-0"
          } z-0 hidden sm:block`}
        >
          <img
            src={WorldwidePropertiesplaneVector}
            alt={t("worldwideProperties.planeVector")}
            className="h-auto animate-float"
          />
        </div>
      </section>

      {/* Imtilak Group Companies Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2
                className="text-[#400198] text-xl font-bold mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "شركاؤنا في مكافئات:" : "Our Partners at Mukafaat:"}
              </h2>
            </div>

            {/* Companies Grid */}
            <div className="bg-[#F8F8F8] rounded-2xl   border border-[#F2F2F2] p-4 lg:p-8">
              <div className="flex flex-wrap justify-center lg:gap-4 gap-2">
                {/* Partner Pills */}
                {[
                  isRTL ? "البنك الأهلي السعودي" : "Saudi National Bank",
                  isRTL ? "بنك الراجحي" : "Al Rajhi Bank",
                  isRTL ? "بنك ساب" : "SABB Bank",
                  isRTL ? "بنك الإنماء" : "Alinma Bank",
                  isRTL ? "الخطوط السعودية" : "Saudi Airlines",
                  isRTL ? "فلاي دبي" : "Fly Dubai",
                  isRTL ? "هيلتون الرياض" : "Hilton Riyadh",
                  isRTL ? "فندق الفور سيزونز" : "Four Seasons Hotel",
                  isRTL ? "ستاربكس السعودية" : "Starbucks Saudi",
                  isRTL ? "ماكدونالدز السعودية" : "McDonald's Saudi",
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <span
                      className="text-[#400198] text-sm font-medium whitespace-nowrap"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* About Mukafaat */}
          <div className="bg-white rounded-xl p-0">
            <div className="text-start gap-2 mb-3">
              <span
                className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "عن مكافئات" : "About Mukafaat"}
              </span>
              <img
                src={UnderTitle}
                alt="underlineDecoration"
                className="h-1 mt-2"
              />
            </div>

            <div className="prose max-w-none text-sm mt-4">
              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "منصة مكافئات توفر لك أفضل العروض والخصومات على البطاقات الائتمانية والكوبونات والحجوزات في المملكة العربية السعودية. اكتشف آلاف الفرص لتوفير المال والاستمتاع بأفضل الخدمات المالية والسياحية المتاحة."
                  : "Mukafaat platform provides you with the best offers and discounts on credit cards, coupons, and bookings in Saudi Arabia. Discover thousands of opportunities to save money and enjoy the best financial and tourism services available."}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "خدماتنا المتميزة:" : "Our Premium Services:"}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "تقدم منصة مكافئات مجموعة شاملة من الخدمات المالية والسياحية، من بطاقات الائتمان من أفضل البنوك إلى كوبونات الخصم الحصرية وحجوزات السفر. نحن نعمل مع أفضل الشركاء في السوق السعودي ونقدم استشارات متخصصة لتوفير المال."
                  : "Mukafaat platform offers a comprehensive range of financial and tourism services, from credit cards from top banks to exclusive discount coupons and travel bookings. We work with the best partners in the Saudi market and provide specialized consulting for saving money."}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "نفخر بخبرتنا الطويلة في السوق السعودي وعلاقاتنا القوية مع البنوك والشركات الرائدة. هدفنا هو توفير أفضل الفرص لتوفير المال لعملائنا مع ضمان الجودة والشفافية في كل خدمة نقدمها."
                  : "We are proud of our long experience in the Saudi market and our strong relationships with banks and leading companies. Our goal is to provide the best money-saving opportunities for our clients while ensuring quality and transparency in every service we provide."}
              </p>

              {/* Table of Contents */}
            </div>
          </div>

          {/* Why This Article */}
          <div className="bg-white rounded-xl p-0">
            <div className="text-start gap-2 mb-3">
              <span
                className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "لماذا تختار مكافئات؟" : "Why Choose Mukafaat?"}
              </span>
              <img
                src={UnderTitle}
                alt="underlineDecoration"
                className="h-1 mt-2"
              />
            </div>

            <div className="prose max-w-none text-sm mt-4">
              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "نقدم في هذه المقالة نظرة شاملة على منصة مكافئات وخدماتها، مع التركيز على الفرص المتاحة لتوفير المال في المملكة العربية السعودية. نهدف إلى تزويد القراء بالمعلومات اللازمة لاتخاذ قرارات ذكية لتوفير المال."
                  : "In this article, we provide a comprehensive overview of Mukafaat platform and its services, focusing on the opportunities available for saving money in Saudi Arabia. We aim to provide readers with the necessary information to make smart money-saving decisions."}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "مميزات مكافئات:" : "Mukafaat Features:"}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "• خبرة أكثر من 5 أعوام في السوق السعودي • شبكة واسعة من الشركاء والبنوك • خدمات شاملة من البطاقات إلى الحجوزات • دعم متواصل للعملاء في المملكة"
                  : "• Over 5 years of experience in the Saudi market • Extensive network of partners and banks • Comprehensive services from cards to bookings • Continuous support for clients in the Kingdom"}
              </p>

              <p
                className="text-gray-700 leading-relaxed mb-4"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL
                  ? "نحن نؤمن بأن التوفير الذكي هو حق لكل فرد، ولهذا نحرص على توفير أفضل العروض والخصومات لجميع عملائنا في المملكة العربية السعودية."
                  : "We believe that smart saving is a right for every individual, which is why we ensure to provide the best offers and discounts for all our clients in Saudi Arabia."}
              </p>

              {/* Table of Contents */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutComponent;
