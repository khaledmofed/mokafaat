import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { useIsRTL } from "@hooks";

import GetStartedSectionInside from "@pages/home/components/GetStartedSectionInside";
import FAQSection from "@pages/home/components/FAQSection";
import { useNavigate } from "react-router-dom";
import { investmentProperties } from "@pages/home/components/Investments";
import InvestmentCard from "@pages/home/components/InvestmentCard";
import Pagination from "../../components/Pagination";
import { useInquiryModal } from "@context";

const InvestmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { openModal } = useInquiryModal();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Use centralized investment data
  const allInvestments = useMemo(() => {
    console.log("Investment Properties:", investmentProperties);
    return investmentProperties;
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(allInvestments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInvestments = allInvestments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of investments section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const handleInvestmentClick = (investment: {
  //   id: number;
  //   title: string;
  //   location?: string;
  //   price: string;
  // }) => {
  //   console.log("Investment clicked:", investment);
  //   console.log("Opening inquiry modal for:", investment.title);
  //   openModal(
  //     `Investment Inquiry - ${investment.title}`,
  //     `Get more information about this ${
  //       investment.title
  //     } investment opportunity in ${investment.location || "Turkey"}. Price: ${
  //       investment.price
  //     }`
  //   );
  // };

  // Debug: طباعة حالة البوب أب
  console.log("InvestmentsPage render - Modal context available:", !!openModal);

  return (
    <>
      <Helmet>
        <title>Investments - Mukafaat</title>
        <meta
          name="description"
          content="Explore our investment opportunities in Turkey. Browse our updated investment listings to find your ideal investment opportunity today."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        {/* Listing Header */}
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
                onClick={() => navigate("/investments")}
              >
                {isRTL ? "الاستثمارات" : "Investments"}
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
                  {isRTL ? "الاستثمار في تركيا" : "Investment in Turkey"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isRTL
                    ? "اكتشف أفضل فرص الاستثمار. تصفح قوائمنا المحدثة للعثور على فرصة الاستثمار المثالية اليوم."
                    : "Explore the best investment opportunities. Browse our updated listings to find your ideal investment opportunity today."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Listings */}
        <div className="bg-white">
          <div className="container mx-auto px-4 lg:px-0 pb-4">
            <div className="pt-0 pb-20 border-t border-[#DDDDDD]">
              {/* Investment Listings */}
              <div className="container mx-auto px-4 lg:px-0 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {currentInvestments.map((investment) => (
                    <InvestmentCard
                      key={investment.id}
                      {...investment}
                      // onButtonClick={() => handleInvestmentClick(investment)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStartedSectionInside />
      <FAQSection />
    </>
  );
};

export default InvestmentsPage;
