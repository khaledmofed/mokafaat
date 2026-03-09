import React, { useMemo, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { IoLocationOutline, IoChatbubblesOutline } from "react-icons/io5";
import { BsShare, BsChevronDown } from "react-icons/bs";
import { FaHeart, FaWhatsapp, FaPlay } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { LuBath } from "react-icons/lu";
import { CiWifiOn, CiAirportSign1 } from "react-icons/ci";
import { TbParkingCircle, TbBeach } from "react-icons/tb";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { PiCityLight } from "react-icons/pi";

import PropertyCard from "@pages/home/components/PropertyCard";
import GetStartedSectionInside from "@pages/home/components/GetStartedSectionInside";
import { properties, getRelatedProperties } from "@data/properties";
import { OwnerImage, UnderTitle, MukafaatVideo } from "@assets";
import { LuPhoneCall } from "react-icons/lu";
import useIsRTL from "@hooks/useIsRTL";
import OwlCarousel from "react-owl-carousel";

const PropertyProductPage: React.FC = () => {
  const { propertySlug, productSlug } = useParams<{
    propertySlug: string;
    productSlug: string;
  }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  // State for active image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // State for read more/less
  const [isExpanded, setIsExpanded] = useState(false);
  // State for video
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get property product from centralized data
  const propertyProduct = useMemo(() => {
    if (!propertySlug || !productSlug) return null;

    const foundProperty = properties.find(
      (p) => p.propertySlug === propertySlug && p.slug === productSlug
    );

    if (!foundProperty) return null;

    // Convert Property to PropertyProduct format
    return {
      id: foundProperty.id,
      slug: foundProperty.slug,
      title: foundProperty.title,
      titleAr: foundProperty.titleAr,
      location: foundProperty.location,
      bedrooms: foundProperty.bedrooms,
      area: foundProperty.area,
      price: foundProperty.price,
      propertyType: foundProperty.propertyType,
      images: [foundProperty.image, ...foundProperty.additionalImages],
      rating: foundProperty.rating,
      views: foundProperty.views,
      description: foundProperty.description,
      amenities: foundProperty.amenities,
      nearbyPlaces: foundProperty.nearbyPlaces,
      specifications: foundProperty.specifications,
      paymentPlan: foundProperty.paymentPlan,
      whyChoose: foundProperty.whyChoose,
    };
  }, [propertySlug, productSlug]);

  // Get related properties from centralized data
  const relatedProperties = useMemo(() => {
    if (!propertySlug || !productSlug) return [];

    const foundProperty = properties.find(
      (p) => p.propertySlug === propertySlug && p.slug === productSlug
    );

    if (!foundProperty) return [];

    const related = getRelatedProperties(foundProperty, 4);

    return related.map((p) => ({
      id: p.id,
      image: p.image,
      propertyType: p.propertyType,
      title: p.title,
      location: p.location,
      bedrooms: p.bedrooms,
      area: p.area,
      price: p.price,
      slug: p.slug,
      propertySlug: p.propertySlug,
    }));
  }, [propertySlug, productSlug]);

  const handleShareClick = (id: number) => {
    console.log("Share clicked:", id);
  };

  const handleVisitClick = (id: number) => {
    console.log("Visit clicked:", id);
  };

  const handleFavoriteClick = (id: number) => {
    // Handle favorite logic
    console.log("Favorite clicked:", id);
  };

  const toggleVideo = () => {
    console.log("Play Video clicked!");
    console.log("Current state:", isVideoPlaying);

    // تشغيل الفيديو
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsVideoPlaying(true);

    console.log("Video will start playing");
  };

  if (!propertyProduct) {
    return <div>{isRTL ? "العقار غير موجود" : "Property not found."}</div>;
  }

  return (
    <>
      <Helmet>
        <title>
          {isRTL
            ? `${propertyProduct.title} - مكافئات`
            : `${propertyProduct.title} - Mukafaat`}
        </title>
        <meta
          name="description"
          content={
            isRTL
              ? `${propertyProduct.title} يقع في ${propertyProduct.location}. ${propertyProduct.description}`
              : `${propertyProduct.title} located in ${propertyProduct.location}. ${propertyProduct.description}`
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 " style={{ paddingTop: "72px" }}>
        <div className="bg-white ">
          <div className="container mx-auto px-4 lg:px-0 border-t-1 border-[#E5E5E5]">
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
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate(`/properties/${propertySlug}`)}
              >
                {propertySlug
                  ? isRTL
                    ? propertySlug === "installment"
                      ? "التقسيط"
                      : propertySlug === "cash"
                      ? "كاش"
                      : propertySlug === "rent"
                      ? "الإيجار"
                      : propertySlug.charAt(0).toUpperCase() +
                        propertySlug.slice(1)
                    : propertySlug.charAt(0).toUpperCase() +
                      propertySlug.slice(1)
                  : isRTL
                  ? "العقار"
                  : "Property"}
              </span>
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span>
                {isRTL ? propertyProduct.titleAr : propertyProduct.title}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content - Left Column */}
              <div className="w-full lg:w-3/4 space-y-6">
                {/* Image Gallery */}
                <div className="bg-white rounded-xl overflow-hidden">
                  {/* Image Flex Layout */}
                  <div className="flex gap-4">
                    {/* Main Large Image - Left Side */}
                    <div className="w-2/3 relative h-[437px]">
                      <img
                        src={propertyProduct.images[activeImageIndex]}
                        alt={propertyProduct.title}
                        className="w-full h-full object-cover rounded-l-xl"
                      />

                      {/* Image Pagination Dots */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {propertyProduct.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                              index === activeImageIndex
                                ? "bg-white"
                                : "bg-white bg-opacity-50"
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right Side Images - Stacked */}
                    <div className="w-1/3 flex flex-col gap-4">
                      {/* Top Right Image */}
                      <div
                        className={`h-[135px] rounded-r-xl overflow-hidden cursor-pointer transition-all duration-200 bg-[#400198] ${
                          activeImageIndex === 1
                            ? "active-image"
                            : "hover:opacity-80"
                        }`}
                        onClick={() => setActiveImageIndex(1)}
                      >
                        <img
                          src={
                            propertyProduct.images[1] ||
                            propertyProduct.images[0]
                          }
                          alt={`${propertyProduct.title} 2`}
                          className={`w-full h-full object-cover ${
                            activeImageIndex === 1
                              ? "opacity-50"
                              : "opacity-100"
                          }`}
                        />
                      </div>

                      {/* Middle Right Image */}
                      <div
                        className={`h-[135px] rounded-r-xl overflow-hidden cursor-pointer transition-all duration-200 bg-[#400198] ${
                          activeImageIndex === 2
                            ? "active-image"
                            : "hover:opacity-80"
                        }`}
                        onClick={() => setActiveImageIndex(2)}
                      >
                        <img
                          src={
                            propertyProduct.images[2] ||
                            propertyProduct.images[0]
                          }
                          alt={`${propertyProduct.title} 3`}
                          className={`w-full h-full object-cover ${
                            activeImageIndex === 2
                              ? "opacity-50"
                              : "opacity-100"
                          }`}
                        />
                      </div>

                      {/* Bottom Right Image */}
                      <div
                        className={`h-[135px] rounded-r-xl overflow-hidden cursor-pointer transition-all duration-200 bg-[#400198] ${
                          activeImageIndex === 3
                            ? "active-image"
                            : "hover:opacity-80"
                        }`}
                        onClick={() => setActiveImageIndex(3)}
                      >
                        <img
                          src={
                            propertyProduct.images[3] ||
                            propertyProduct.images[0]
                          }
                          alt={`${propertyProduct.title} 4`}
                          className={`w-full h-full object-cover ${
                            activeImageIndex === 3
                              ? "opacity-50"
                              : "opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Title and Location */}
                <div className="bg-white rounded-xl p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-[#400198] mb-2">
                        {propertyProduct.title}
                      </h1>
                      <div className="flex items-center gap-2 text-sm">
                        <IoLocationOutline className="text-lg" />
                        <span>{propertyProduct.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">
                          {propertyProduct.rating}
                        </span>
                      </div>
                      <div className="font-semibold">
                        {propertyProduct.views} Views
                      </div>
                      {/* Share and Like Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShareClick(propertyProduct.id)}
                          className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                          <BsShare className="text-lg" />
                        </button>
                        <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all duration-200">
                          <FaHeart className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Specifications Table */}
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-100">
                              Number of room & Living room
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-100">
                              Area
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-100">
                              Number of bathrooms
                            </th>
                            <th className="text-left py-4 px-6 font-semibold text-gray-700 bg-gray-100">
                              Prices start at
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {propertyProduct.specifications.map((spec, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-6 text-gray-700 font-medium">
                                {spec.rooms}
                              </td>
                              <td className="py-4 px-6 text-gray-700 font-medium">
                                {spec.area}
                              </td>
                              <td className="py-4 px-6 text-gray-700 font-medium">
                                {spec.bathrooms}
                              </td>
                              <td className="py-4 px-6 font-semibold text-[#400198]">
                                {spec.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                      Latest Price Update{" "}
                      <span className="text-gray-700 font-medium">
                        28-04-2025
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Plan */}
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
                      {isRTL ? "المدفوعات" : "Payments"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  <div
                    className="flex items-start gap-0 mt-4"
                    style={{
                      background: "#f3f4f6",
                      padding: "12px",
                      borderRadius: "15px",
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#fd671a] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                        1
                      </div>
                      <div className="text-center w-14">
                        <div className="font-semibold text-[#400198] w-14">
                          {propertyProduct.paymentPlan.downPayment}
                        </div>
                        <div className="text-xs text-gray-600 w-14 ">
                          {isRTL ? "نوع الدفعة المقدمة" : "Down Type"}
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex-1 h-1 bg-gray-300 rounded-full"
                      style={{ marginTop: "22px", height: "3px" }}
                    ></div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[#fd671a] rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                        2
                      </div>
                      <div className="text-center w-14">
                        <div className="font-semibold text-[#400198] w-14">
                          {propertyProduct.paymentPlan.downPayment}
                        </div>
                        <div className="text-xs text-gray-600 w-14">
                          {propertyProduct.paymentPlan.installments}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why This Property */}
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
                      {isRTL ? "لماذا هذا العقار" : "Why This Property"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  <p
                    className={`text-gray-700 text-sm leading-relaxed mb-0 ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {isRTL
                      ? "يقع المشروع عند نقطة التقاء منطقة فاتح مع بيلرام باشا وأيوب سلطان. تحديداً ضمن إحدى المناطق المركزية في إسطنبول الواقعة في قلب المدينة القديمة من إسطنبول، ممتدة إلى سواحل خليج القرن الذهبي. موقع المشروع يطل على أهم الطرق ووسائل النقل التي تربطه بجميع مناطق إسطنبول، مثل طرق E5 و E80، ليس بعيداً عن نفق أوراسيا، وعلى مسافة قريبة من خط المترو، الترامواي، المتروباص، خطوط الحافلات، والعبارات البحرية. بالإضافة إلى احتوائه على عشرات المحلات التي توفر احتياجات السكان؛ المشروع مجاور لأهم الأسواق ومراكز التسوق في إسطنبول، مثل مول أكسيس إسطنبول الذي يقع على بعد أمتار قليلة من المشروع، فوروم إسطنبول مول، وغيرها. المشروع على مسافة قريبة من عدة مدارس حكومية، وهو قريب من المستشفيات الحكومية والخاصة. كما أنه على مسافة قريبة من جامعات إسطنبول المرموقة، مثل جامعة قدير هاس، جامعة بيلجي، وجامعة الخليج."
                      : "The project is located at the meeting point of Fatih district with Bayram Pasha and Eyupsultan. specifically within one of Istanbul's central districts located in the urban heart of the ancient city of Istanbul, extending to the coasts of the Golden Horn Bay. The project location overlooks the most important roads and means of transportation that connect it to all areas of Istanbul, such as the E5 and E80 roads, not far from the Eurasia Tunnel, and within walking distance of the metro line, tramway, Metrobus, bus lines, and sea ferries. In addition to containing dozens of shops that provide the needs of the residents; The project is adjacent to the most important markets and shopping centers in Istanbul, such as Axis Istanbul Mall, which is located a few meters from the project, Forum Istanbul Mall, and others The project is within walking distance of several public schools, and it is close to the government and private hospitals. It is also within walking distance of the prestigious Istanbul universities, such as Kadir Has University, Bilgi University, and Gulf University."}
                  </p>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#400198] text-sm font-semibold hover:underline cursor-pointer"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </div>

                {/* Amenities */}
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
                      Amenities
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {[
                      {
                        icon: <LuBath className="text-2xl text-[#400198]" />,
                        name: "Bathup",
                      },
                      {
                        icon: <CiWifiOn className="text-2xl text-[#400198]" />,
                        name: "WI-FI",
                      },
                      {
                        icon: (
                          <TbParkingCircle className="text-2xl text-[#400198]" />
                        ),
                        name: "Parking",
                      },
                      {
                        icon: (
                          <IoGameControllerOutline className="text-2xl text-[#400198]" />
                        ),
                        name: "Play area",
                      },
                      {
                        icon: <CgGym className="text-2xl text-[#400198]" />,
                        name: "GYM",
                      },
                    ].map((amenity, index) => (
                      <div
                        key={index}
                        className="bg-[#F2F2F2] rounded-lg p-4 text-center shadow-sm min-w-[120px] flex flex-col items-center gap-2"
                      >
                        {amenity.icon}
                        <span className="text-sm font-medium text-gray-700">
                          {amenity.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Places */}
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
                      {isRTL ? "الأماكن القريبة" : "Nearby Places"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#fd671a] rounded-full flex items-center justify-center">
                        <TbBeach className="text-[#400198] text-lg" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        Distance to the Beach{" "}
                        <span className="font-medium">
                          {propertyProduct.nearbyPlaces.beach}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#fd671a] rounded-full flex items-center justify-center">
                        <PiCityLight className="text-[#400198] text-lg" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        Distance to City Center{" "}
                        <span className="font-medium">
                          {propertyProduct.nearbyPlaces.cityCenter}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 col-span-2">
                      <div className="w-8 h-8 bg-[#fd671a] rounded-full flex items-center justify-center">
                        <CiAirportSign1 className="text-[#400198] text-lg" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        Distance to the Airport{" "}
                        <span className="font-medium">
                          {propertyProduct.nearbyPlaces.airport}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video / 360 View */}
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
                      {isRTL ? "فيديو / عرض 360" : "Video / 360 View"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-md">
                    {/* Video Container */}
                    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-md">
                      {/* Video - Shown when playing */}
                      <video
                        ref={videoRef}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          isVideoPlaying ? "opacity-100" : "opacity-0"
                        }`}
                        controls={true}
                        onEnded={() => {
                          console.log("Video ended, returning to image");
                          setIsVideoPlaying(false);
                        }}
                        onPause={() => {
                          console.log("Video paused");
                          setIsVideoPlaying(false);
                        }}
                        onPlay={() => {
                          console.log("Video started playing");
                          setIsVideoPlaying(true);
                        }}
                      >
                        <source src={MukafaatVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Resume Button - Only visible when video is paused */}
                      {!isVideoPlaying &&
                        videoRef.current &&
                        videoRef.current.currentTime > 0 && (
                          <button
                            onClick={toggleVideo}
                            className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10 transition-all duration-300"
                            aria-label="Resume video"
                            type="button"
                          >
                            <div className="w-20 h-20 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                              <FaPlay className="text-white text-2xl ml-1" />
                            </div>
                          </button>
                        )}

                      {/* Play Button - Only visible when video is not playing and no progress */}
                      {!isVideoPlaying &&
                        (!videoRef.current ||
                          videoRef.current.currentTime === 0) && (
                          <button
                            onClick={toggleVideo}
                            className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10 transition-all duration-300"
                            aria-label="Play video"
                            type="button"
                          >
                            <div className="w-20 h-20 bg-[#fd671a] hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                              <FaPlay className="text-white text-2xl ml-1" />
                            </div>
                          </button>
                        )}

                      {/* Video Overlay - Hidden when video is playing */}
                      {!isVideoPlaying && (
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="w-full lg:w-1/4 space-y-6">
                {/* Start From Card */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <h3 className="text-base text-[#4C4C4C] mb-2">Start From</h3>
                  <div className="text-2xl font-bold text-[#400198] mb-4">
                    {propertyProduct.price}
                  </div>
                  <p className="text-base text-[#4C4C4C]  mb-6">
                    {isRTL
                      ? "وكالة عقارية تقدم خدمات سريعة وموثوقة لشراء وبيع وتأجير العقارات."
                      : "Real estate agency offering quick and reliable services for buying, selling, and renting properties."}
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="w-[45px] h-[45px] min-w-[45px] min-h-[45px] bg-green-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors">
                      <FaWhatsapp className="text-xl" />
                    </button>
                    <button className="bg-[#400198] h-[45px] w-full justify-center hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2 cursor-pointer">
                      <IoChatbubblesOutline className="text-lg" />
                      {isRTL ? "تواصل معنا" : "Get In Touch"}
                    </button>
                  </div>
                </div>

                {/* Owner Details */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <h3 className="text-base font-bold text-[#400198] mb-4">
                    {isRTL ? "تفاصيل المالك" : "Owner Details"}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={OwnerImage}
                        alt="Owner"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-[#400198]">
                        Damac Properties L.L.C
                      </div>
                      <div className="text-sm text-gray-600">
                        {isRTL ? "25 عقار" : "25 Properties"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <h3 className="text-base font-bold text-[#400198] mb-4">
                    {isRTL
                      ? "اختر اليوم المناسب لنا ل"
                      : "Choose the suitable day for us to"}{" "}
                    <span className="text-[#fd671a]">
                      {isRTL ? "التواصل معك" : "contact you"}
                    </span>
                  </h3>

                  {/* Day Selection */}
                  <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <button
                          key={day}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "الاسم" : "Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={isRTL ? "أدخل الاسم" : "Enter Name"}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        placeholder={isRTL ? "رقم الهاتف" : "Phone Number"}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      />
                    </div>
                    <button className="bg-[#400198] h-[45px] w-full justify-center hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2 cursor-pointer">
                      <LuPhoneCall className="text-lg" />
                      {isRTL ? "اتصل بي" : "Call me"}
                    </button>
                  </div>
                </div>

                {/* Why Choose Our Properties */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <h3 className="text-base font-bold text-[#400198] mb-4">
                    {isRTL
                      ? "لماذا تختار عقاراتنا؟"
                      : "Why Choose Our Properties?"}
                  </h3>
                  <div className="space-y-3">
                    {[
                      isRTL ? "مواقع متميزة" : "Prime locations",
                      isRTL ? "بناء عالي الجودة" : "High-quality construction",
                      isRTL ? "مرافق استثنائية" : "Exceptional amenities",
                      isRTL
                        ? "خبراء عقاريون ذوو خبرة"
                        : "Experienced real estate experts",
                      isRTL ? "استشارة شخصية" : "Personalized consultation",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-sm gap-3"
                      >
                        <FaCircleCheck className="text-[#fd671a] text-lg mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Properties Section */}
            <div className="mt-16 pb-20">
              <div className="text-start mb-10">
                <div className="text-start gap-2 mb-3">
                  <span
                    className="text-[#fd671a] text-md font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {isRTL ? "العقارات ذات الصلة" : "Related Properties"}
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
                  {isRTL
                    ? "عقارات مشابهة قد تعجبك"
                    : "Similar Properties You Might Like"}
                </h2>
              </div>

              {/* Properties Carousel */}
              <div
                className="relative PropertiesCarousel"
                style={{
                  direction: isRTL && relatedProperties.length < 4 ? "rtl" : "ltr",
                }}
              >
                <OwlCarousel
                  className="owl-theme"
                  loop={relatedProperties.length > 4}
                  margin={10}
                  nav={relatedProperties.length > 4}
                  dots={false}
                  autoplay={relatedProperties.length > 4}
                  autoplayTimeout={5000}
                  autoplayHoverPause={true}
                  style={{
                    direction: isRTL && relatedProperties.length < 4 ? "rtl" : "ltr",
                  }}
                  responsive={{
                    0: {
                      items: 1,
                    },
                    600: {
                      items: 2,
                    },
                    1000: {
                      items: 4,
                    },
                  }}
                >
                  {relatedProperties.map((property) => (
                    <div key={property.id} className="item">
                      <PropertyCard
                        {...property}
                        slug={property.slug}
                        propertySlug={property.propertySlug}
                        onFavoriteClick={handleFavoriteClick}
                        onShareClick={handleShareClick}
                        onVisitClick={handleVisitClick}
                      />
                    </div>
                  ))}
                </OwlCarousel>
              </div>

              {/* Main CTA Button */}
              <div className="text-center mt-0">
                <button
                  onClick={() => navigate("/properties")}
                  className="bg-[#400198] mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2 cursor-pointer"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  <span>
                    {isRTL ? "عرض جميع العقارات" : "View All Properties"}
                  </span>
                  <IoIosArrowRoundForward
                    className={`text-3xl transform ${
                      isRTL ? "rotate-45" : "-rotate-45"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-20">
        <GetStartedSectionInside />
      </div>
    </>
  );
};

export default PropertyProductPage;
