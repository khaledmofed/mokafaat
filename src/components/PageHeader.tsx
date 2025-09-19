// import { AboutPattern } from "@assets";
import { useIsRTL } from "@hooks";
import { PageHeaderProps } from "@interfaces";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  // const titleFontType = isRTL
  // ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
  // : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <>
      <div className="bg-white pb-6">
        <div className="container mx-auto px-4 lg:px-0 py-0">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-[#141414] font-medium mb-4 pt-4">
            <HiOutlineHome className="me-2 text-lg" />
            <span
              className="cursor-pointer hover:text-[#fd671a] transition-colors"
              onClick={() => navigate("/")}
            >
              {isRTL ? "الرئيسية" : "Home"}
            </span>
            <BsChevronDown
              className={`mx-2 transform ${
                isRTL ? "rotate-90" : "rotate-[270deg]"
              }`}
            />
            <span
              className="cursor-pointer hover:text-[#fd671a] transition-colors"
              // onClick={() => navigate("/investments")}
            >
              {t(`${title}`)}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1
                className="text-[#400198] text-3xl font-bold"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {t(`${title}`)}
              </h1>
              <p
                className="text-gray-600 text-sm"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[100px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
          <h1
            className={`${titleFontType} mb-4 tracking-tight leading-none text-white`}
          >
            {t(`${title}`)}
          </h1>
          <div className="flex items-center justify-center space-x-2 text-xs">
            <Link to="/" className="text-white hover:text-purple-300">
              {t("home.navbar.home")}
            </Link>
            <span className="text-white">|</span>
            <span className="text-purple-300">{t(`${title}`)}</span>
          </div>
        </div>
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section> */}
    </>
  );
};

export default PageHeader;
