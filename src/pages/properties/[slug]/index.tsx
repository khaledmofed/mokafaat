import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import PropertyCard from "../../home/components/PropertyCard";
import Select, { components } from "react-select";
import { HiOutlineHome } from "react-icons/hi";
import { useIsRTL } from "@hooks";
import { UnderTitle } from "@assets";
import GetStartedSectionInside from "@pages/home/components/GetStartedSectionInside";
import FAQSection from "@pages/home/components/FAQSection";
import { propertyTypes, getPropertiesByType } from "@data/properties";

// Custom SingleValue component for Sort by
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSingleValue = (props: any) => {
  const isRTL = useIsRTL();
  return (
    <components.SingleValue {...props}>
      <span style={{ color: "#4C4C4C", fontSize: "13px", fontWeight: "500" }}>
        {isRTL ? "ترتيب حسب: " : "Short by : "}
      </span>
      <span style={{ color: "#400198", fontSize: "13px", fontWeight: "500" }}>
        {props.children}
      </span>
    </components.SingleValue>
  );
};

const PropertyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState({
    value: "recently-added",
    label: "Recently Added",
  });
  const [activeTab, setActiveTab] = useState("programs");

  // Property data based on slug using centralized data
  const propertyData = useMemo(() => {
    if (!slug) return null;

    const propertyType = propertyTypes.find((pt) => pt.slug === slug);
    if (!propertyType) return null;

    const categoryProperties = getPropertiesByType(slug);

    return {
      title: propertyType.name,
      titleAr: propertyType.nameAr || propertyType.name,
      description: `Find your perfect ${propertyType.name} Plans`,
      descriptionAr: `اعثر على خطط ${
        propertyType.nameAr || propertyType.name
      } المثالية`,
      properties: categoryProperties.map((p) => ({
        id: p.id,
        image: p.image,
        propertyType: p.propertyType,
        propertyTypeAr: p.propertyTypeAr,
        title: p.title,
        location: p.location,
        bedrooms: p.bedrooms,
        area: p.area,
        price: p.price,
        slug: p.slug,
        propertySlug: p.propertySlug,
      })),
    };
  }, [slug]);

  const isRTL = useIsRTL();

  if (!propertyData) {
    return <div>{isRTL ? "العقار غير موجود" : "Property not found"}</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          {isRTL
            ? `${propertyData.title} - مكافئات`
            : `${propertyData.title} - Mukafaat`}
        </title>
        <meta
          name="description"
          content={
            isRTL
              ? `اكتشف ${propertyData.title}. تصفح قوائمنا المحدثة للعثور على منزلك المثالي أو فرصة الاستثمار اليوم.`
              : `Explore ${propertyData.title}. Browse our updated listings to find your ideal home or investment opportunity today.`
          }
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
                onClick={() => navigate("/properties")}
              >
                {isRTL ? "العقارات" : "Properties"}
              </span>
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span>{isRTL ? propertyData.titleAr : propertyData.title}</span>
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
                  {isRTL ? propertyData.titleAr : propertyData.title}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isRTL
                    ? propertyData.descriptionAr
                    : propertyData.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-60">
                  <Select
                    value={sortBy}
                    onChange={(option) =>
                      setSortBy(
                        option || {
                          value: "recently-added",
                          label: isRTL ? "مضاف مؤخراً" : "Recently Added",
                        }
                      )
                    }
                    options={[
                      {
                        value: "recently-added",
                        label: isRTL ? "مضاف مؤخراً" : "Recently Added",
                      },
                      {
                        value: "price-low-high",
                        label: isRTL
                          ? "السعر: من الأقل إلى الأعلى"
                          : "Price: Low to High",
                      },
                      {
                        value: "price-high-low",
                        label: isRTL
                          ? "السعر: من الأعلى إلى الأقل"
                          : "Price: High to Low",
                      },
                      {
                        value: "newest-first",
                        label: isRTL ? "الأحدث أولاً" : "Newest First",
                      },
                    ]}
                    placeholder={isRTL ? "ترتيب حسب" : "Sort by"}
                    className="sort-select-container"
                    classNamePrefix="react-select"
                    isSearchable={false}
                    components={{
                      SingleValue: CustomSingleValue,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation/Category Tabs */}
        <div className="bg-white">
          <div className="container mx-auto px-4 lg:px-0 py-4">
            {/* Main Tabs */}
            <div
              className="flex space-x-1 mb-4"
              style={{
                borderBottom: "1px solid #DDDDDD",
              }}
            >
              <button
                onClick={() => setActiveTab("programs")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "programs"
                    ? "bg-[#400198] text-white"
                    : "bg-gray-100 hover:text-gray-700 text-[#000]"
                }`}
              >
                {isRTL ? propertyData.titleAr : propertyData.title}
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#400198] text-white"
                    : "bg-gray-100 hover:text-gray-700 text-[#000]"
                }`}
              >
                {isRTL ? "نظرة عامة" : "Overview"}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "programs" ? (
              <>
                <div className="pt-4 pb-20">
                  {/* Property Listings */}
                  <div className="container mx-auto px-4 lg:px-0 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                      {propertyData.properties.map((property) => (
                        <PropertyCard
                          key={property.id}
                          {...property}
                          slug={property.slug}
                          propertySlug={property.propertySlug}
                          onShareClick={() => console.log("Share clicked")}
                          onVisitClick={() => console.log("Visit clicked")}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Overview Content */}
                <div className="space-y-6 pt-4 pb-20">
                  <div className="">
                    <div className="text-start gap-2 mb-3">
                      <span
                        className="text-[#400198] text-lg font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL
                            ? "Readex Pro, sans-serif"
                            : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "تفاصيل النظرة العامة" : "Overview Details"}
                      </span>
                      <img
                        src={UnderTitle}
                        alt="underlineDecoration"
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>

                  <div className="max-w-4xl space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-black mb-3">
                        {isRTL
                          ? `مرحباً بكم في صفحة خطط ${
                              propertyData.titleAr || propertyData.title
                            }!`
                          : `Welcome to our ${propertyData.title} Plans Page!`}
                      </h4>
                      <p className="text-black leading-relaxed">
                        {isRTL
                          ? `تصفح مجموعة واسعة من ${
                              propertyData.titleAr || propertyData.title
                            } للبيع والإيجار. ابحث عن المطابقة المثالية مع قوائم مفصلة وفلترة بحث سهلة. اكتشف أحدث قوائم العقارات مع الصور والأسعار والتفاصيل الرئيسية. منزلك المثالي أو استثمارك على بعد نقرة واحدة.`
                          : `Browse a wide range of ${propertyData.title.toLowerCase()} for sale and rent. Find your perfect match with detailed listings and easy search filters. Explore the latest property listings with photos, prices, and key details. Your ideal home or investment is just a click away.`}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-black mb-3">
                        {isRTL
                          ? `لماذا تختار ${
                              propertyData.titleAr || propertyData.title
                            }؟`
                          : `Why Choose Our ${propertyData.title}?`}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "مواقع متميزة: عقارات في أفضل المواقع الاستراتيجية"
                              : "Prime locations: Properties in the best strategic locations"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "جودة عالية في البناء: مواد بناء عالية الجودة وتصميم متقن"
                              : "High-quality construction: Premium building materials and meticulous design"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "مرافق استثنائية: مجموعة شاملة من المرافق والخدمات"
                              : "Exceptional amenities: Comprehensive range of facilities and services"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "خبراء عقاريون: فريق من الخبراء ذوي الخبرة الطويلة"
                              : "Real estate experts: Team of experienced professionals"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="">
                      <p className="text-black font-medium">
                        {isRTL
                          ? `ابدأ رحلتك نحو مستقبل أكثر إشراقاً مع ${
                              propertyData.titleAr || propertyData.title
                            }. اتصل الآن!`
                          : `Start your journey toward a brighter future with our ${propertyData.title}. Contact Now!`}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <GetStartedSectionInside />
      <FAQSection />
    </>
  );
};

export default PropertyPage;
