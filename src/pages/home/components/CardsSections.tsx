import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiCardsToModels } from "@network/mappers/cardsMapper";

const CardsSections = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();

  // Fetch cards from API
  const { data: webHomeResponse } = useWebHome();

  // Extract cards from API response
  const apiCards = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cards = data?.cards as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(cards)) return [];
    return cards;
  }, [webHomeResponse]);

  // Map API cards to frontend models
  const cardsImages = useMemo(() => {
    return mapApiCardsToModels(apiCards);
  }, [apiCards]);

  // Cards display - take first 8 cards, pad with placeholder if needed
  const cardsDisplay = useMemo(() => {
    const placeholder = {
      id: 0,
      image: "https://via.placeholder.com/300x200?text=Card",
      title: "بطاقة",
      price: "0.00",
      category: "",
    };
    const padded = [...cardsImages];
    while (padded.length < 8) {
      padded.push({ ...placeholder, id: padded.length + 1 });
    }
    return {
      img1: padded[0] || placeholder,
      img2: padded[1] || placeholder,
      img3: padded[2] || placeholder,
      img4: padded[3] || placeholder,
      img5: padded[4] || placeholder,
      img6: padded[5] || placeholder,
      img7: padded[6] || placeholder,
      img8: padded[7] || placeholder,
    };
  }, [cardsImages]);

  // Cards are static - no need to update them

  // Cards are static - no animation needed

  return (
    <section className="py-16" style={{ backgroundColor: "#F7F8FB" }}>
      <div className="">
        {/* Header Section */}

        <div className="space-y-6 container mx-auto mb-6 px-4 flex-mobile">
          {/* Subtitle */}
          <div className=" flex justify-between items-center ">
            <div className={`space-y-6`}>
              {/* Header */}
              <div className="text-start mb-0">
                <h2 className="text-[#400198] text-3xl font-bold">
                  {t("home.cards.title")}
                </h2>
                <p className="text-md text-gray-700 leading-relaxed">
                  {t("home.cards.description")}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-0">
              <button
                onClick={() => navigate("/cards")}
                className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
                style={{
                  marginTop: "0px",
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                <span>{t("home.cards.viewAll")}</span>
                <IoIosArrowRoundForward
                  className={`text-3xl transform ${
                    isRTL ? "rotate-45" : "-rotate-45"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-4">
          <div className="flex gap-4 max-w-full overflow-hidden">
            {/* مجموعة 1 - مرئية في الموبايل والديسكتوب */}
            <div className="w-full lg:w-1/2">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateRows: "auto auto" }}
              >
                {/* صورتان فوق بعض يسار */}
                <div className="col-span-2 flex gap-4">
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <img
                      src={cardsDisplay.img1.image}
                      alt={cardsDisplay.img1.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <img
                      src={cardsDisplay.img2.image}
                      alt={cardsDisplay.img2.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div className="col-span-2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <img
                    src={cardsDisplay.img3.image}
                    alt={cardsDisplay.img3.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* صورة بالطول يمين */}
                <div className="col-span-1 relative overflow-hidden h-456 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <img
                    src={cardsDisplay.img4.image}
                    alt={cardsDisplay.img4.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* مجموعة 2 - مخفية في الموبايل، مرئية في الديسكتوب */}
            <div className="hidden lg:block w-1/2">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateRows: "auto auto" }}
              >
                {/* صورتان فوق بعض يسار */}
                <div className="col-span-2 flex gap-4">
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <img
                      src={cardsDisplay.img5.image}
                      alt={cardsDisplay.img5.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <img
                      src={cardsDisplay.img6.image}
                      alt={cardsDisplay.img6.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div className="col-span-2 h-220 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <img
                    src={cardsDisplay.img7.image}
                    alt={cardsDisplay.img7.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* صورة بالطول يمين */}
                <div className="col-span-1 relative overflow-hidden h-456 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <img
                    src={cardsDisplay.img8.image}
                    alt={cardsDisplay.img8.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsSections;
