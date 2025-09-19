import React from "react";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  UnderTitle,
  I1,
  I2,
  I3,
  I4,
  I5,
  I6,
  I7,
  I8,
  PatternNewProperty,
} from "@assets";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowRoundForward } from "react-icons/io";
import InvestmentCard from "./InvestmentCard";

interface InvestmentProperty {
  id: number;
  image: string;
  title: string;
  price: string;
  downPayment?: string;
  installments?: string;
  location?: string;
  feature?: string;
  validUntil: string;
  buttonText: string;
}

// Export investment properties data
export const investmentProperties: InvestmentProperty[] = [
  {
    id: 1,
    image: I1,
    title: "4+1",
    price: "$630.500",
    downPayment: "30%",
    installments: "60 MONTHS",
    location: "Bahçeşehir",
    feature: "Elegant design",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 2,
    image: I2,
    title: "COMMERCIAL SHOP",
    price: "$425,000",
    location: "SARIYER COAST",
    feature: "HIGH RENTAL YIELD",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 3,
    image: I3,
    title: "2 ADJACENT 1+1",
    price: "$440,000",
    location: "ZEYTİNBURNU",
    feature: "DELIVERY IN JUST 2 MONTHS",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 4,
    image: I4,
    title: "LUXURY VILLA",
    price: "$850,000",
    downPayment: "25%",
    installments: "72 MONTHS",
    location: "Beykoz",
    feature: "Sea View",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 5,
    image: I5,
    title: "MODERN APARTMENT",
    price: "$380,000",
    downPayment: "20%",
    installments: "48 MONTHS",
    location: "Kadıköy",
    feature: "City Center",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 6,
    image: I6,
    title: "INVESTMENT OFFICE",
    price: "$650,000",
    location: "Maslak",
    feature: "Business District",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 7,
    image: I7,
    title: "SEA VIEW PENTHOUSE",
    price: "$1,200,000",
    downPayment: "35%",
    installments: "84 MONTHS",
    location: "Beşiktaş",
    feature: "Premium Location",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 8,
    image: I8,
    title: "FAMILY COMPLEX",
    price: "$750,000",
    downPayment: "30%",
    installments: "60 MONTHS",
    location: "Çekmeköy",
    feature: "Family Friendly",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 9,
    image: I7,
    title: "SEA VIEW PENTHOUSE",
    price: "$1,200,000",
    downPayment: "35%",
    installments: "84 MONTHS",
    location: "Beşiktaş",
    feature: "Premium Location",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
  {
    id: 10,
    image: I8,
    title: "FAMILY COMPLEX",
    price: "$750,000",
    downPayment: "30%",
    installments: "60 MONTHS",
    location: "Çekmeköy",
    feature: "Family Friendly",
    validUntil: "2025-08-01",
    buttonText: "Get The Offer Now",
  },
];

const Investments: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };

  const handleShare = (id: number) => {
    console.log("Share clicked:", id);
  };

  return (
    <section className="pb-16 lg:pb-32 relative overflow-hidden">
      <div className="container mx-auto relative px-4 z-10">
        <div className="block lg:flex gap-12 justify-between items-end">
          {/* Left Section - Content */}
          <div className={`space-y-6`}>
            {/* Header */}
            <div className="">
              <div className="text-start gap-2 mb-3">
                <span
                  className="text-[#fd671a] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {t("investments.subtitle")}
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
                {t("investments.mainTitle")}
              </h2>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/investments")}
              className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
              style={{
                marginTop: "0px",
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              <span>{t("investments.viewInvestmentPlans")}</span>
              <IoIosArrowRoundForward
                className={`text-3xl transform ${
                  isRTL ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Investment Properties Carousel */}
        <div className="mt-0 InvestmentCarousel">
          <OwlCarousel
            className="owl-theme"
            {...owlCarouselOptions}
            style={{
              direction: "ltr",
            }}
          >
            {investmentProperties.map((property) => (
              <div key={property.id} className="item">
                <InvestmentCard {...property} onShare={handleShare} />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <div
        className={`absolute -bottom-40 w-1/1 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={PatternNewProperty}
          alt={t("worldwideProperties.appPattern")}
          className="h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default Investments;
