import { useTranslation } from "react-i18next";

// Import cards images
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  // Cards5,
  Cards8,
  Cards6,
  Cards7,
} from "@assets";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useNavigate } from "react-router-dom";

const CardsSections = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  // No need for API call since we're using static cards

  // Cards data - using static cards images
  const cardsImages = [
    {
      id: 1,
      image: Cards3,
      title: "STC Card",
    },
    {
      id: 2,
      image: Cards4,
      title: "Gathern Card",
    },
    {
      id: 3,
      image: Cards1,
      title: "VIP Package",
    },
    {
      id: 4,
      image: Cards8,
      title: "STC Pay Card",
    },
    {
      id: 5,
      image: Cards3,
      title: "Hunger Station Card",
    },
    {
      id: 6,
      image: Cards6,
      title: "STC 3 Months",
    },
    {
      id: 7,
      image: Cards7,
      title: "STC TV Classic",
    },
    {
      id: 8,
      image: Cards2,
      title: "STC TV Classic",
    },
  ];

  // Cards display - using static cards
  const cardsDisplay = {
    img1: cardsImages[0], // STC Card
    img2: cardsImages[1], // Gathern Card
    img3: cardsImages[2], // VIP Package
    img4: cardsImages[3], // STC Pay Card
    img5: cardsImages[4], // Hunger Station Card
    img6: cardsImages[5], // STC 3 Months
    img7: cardsImages[6], // STC TV Classic
    img8: cardsImages[7], // STC Card (repeat for 8th position)
  };

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
