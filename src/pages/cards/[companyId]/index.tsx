import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { useState, useMemo } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { getCompanyById, type CardCompany, type CardOffer } from "@data/cards";
import OfferCard from "./components/OfferCard";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
  AboutPattern,
  Cards14,
  Cards12,
  Cards13,
} from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiCardsToModels } from "@network/mappers/cardsMapper";

const CompanyDetailsPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const { data: webHomeResponse } = useWebHome();

  const apiCompany = useMemo((): CardCompany | null => {
    if (!webHomeResponse || !companyId) return null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cards = data?.cards as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(cards)) return null;
    const models = mapApiCardsToModels(cards);
    const card = models.find((c) => String(c.id) === String(companyId));
    if (!card) return null;
    const offer: CardOffer = {
      id: String(card.id),
      title: { ar: card.title, en: card.title },
      description: {
        ar: card.description ?? "",
        en: card.description ?? "",
      },
      price: parseFloat(card.price) || 0,
      currency: "SAR",
      validity: { ar: "", en: "" },
      features: [],
      image: card.image,
      rating: 0,
      purchases: 0,
      views: 0,
      downloads: 0,
      bookmarks: 0,
    };
    return {
      id: String(card.id),
      name: { ar: card.title, en: card.title },
      logo: card.image,
      category: {
        key: card.category || "other",
        ar: card.category,
        en: card.category,
      },
      description: {
        ar: card.description ?? "",
        en: card.description ?? "",
      },
      color: "#400198",
      offers: [offer],
    };
  }, [webHomeResponse, companyId]);

  const staticCompany = companyId ? getCompanyById(companyId) : null;
  const company = staticCompany || apiCompany;

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "الشركة غير موجودة" : "Company not found"}
          </h2>
          <button
            onClick={() => navigate("/cards")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للبطاقات" : "Back to Cards"}
          </button>
        </div>
      </div>
    );
  }

  // Function to get card image (supports URL from API or static asset name)
  const getCardImage = (logoName: string) => {
    if (logoName.startsWith("http")) return logoName;
    switch (logoName) {
      case "Cards1":
        return Cards1;
      case "Cards2":
        return Cards2;
      case "Cards3":
        return Cards3;
      case "Cards4":
        return Cards4;
      case "Cards5":
        return Cards5;
      case "Cards6":
        return Cards6;
      case "Cards7":
        return Cards7;
      case "Cards8":
        return Cards8;
      case "Cards12":
        return Cards12;
      case "Cards13":
        return Cards13;
      case "Cards14":
        return Cards14;
      default:
        return Cards1;
    }
  };

  const handleOfferClick = (offer: CardOffer) => {
    navigate(`/cards/${companyId}/offer/${offer.id}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? company.name.ar : company.name.en} -{" "}
          {isRTL ? "البطاقات" : "Cards"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/cards/${companyId}`}
        />
      </Helmet>

      {/* Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/cards")}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Company Logo */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src={getCardImage(company.logo)}
              alt={company.name[isRTL ? "ar" : "en"]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-2xl lg:text-2xl font-semibold mb-4 tracking-tight leading-none text-white">
            {company.name[isRTL ? "ar" : "en"]}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-4">
            {company.description[isRTL ? "ar" : "en"]}
          </p>

          {/* Category and Offers Count */}
          <div className="flex items-center justify-center gap-4 text-white/70 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {isRTL ? company.category.ar : company.category.en}
            </span>
            <span className="text-sm">
              {isRTL
                ? `${company.offers.length} عروض متاحة`
                : `${company.offers.length} offers available`}
            </span>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-sm md:text-base">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to="/cards"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "البطاقات" : "Cards"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">
              {company.name[isRTL ? "ar" : "en"]}
            </span>
          </div>
        </div>

        {/* Pattern Background */}
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="container mx-auto md:p-10 p-6">
        <div className="mb-8">
          <h2 className="text-[#400198] text-3xl font-bold">
            {isRTL ? "العروض المميزة" : "Special Offers"}
          </h2>
          <p className="text-md text-gray-700 leading-relaxed">
            {isRTL
              ? "اختر العرض الذي يناسبك"
              : "Choose the offer that suits you"}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              companyId={company.id}
              onOfferClick={handleOfferClick}
            />
          ))}
        </div>
      </section>

      <GetStartedSection className="mt-20 mb-28 " />
    </>
  );
};

export default CompanyDetailsPage;
