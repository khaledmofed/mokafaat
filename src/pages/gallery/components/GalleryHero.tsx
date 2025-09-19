import { t } from "i18next";
import { useIsRTL } from "@hooks";
import { AboutBg } from "@assets";

const GalleryHero = () => {
  const isRTL = useIsRTL();

  return (
    <section className="relative py-20 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${AboutBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <span className="inline-block text-[#fd671a] text-lg font-semibold mb-4 bg-white/90 px-6 py-2 rounded-full">
            {t("gallery.subtitle") || "Our Work"}
          </span>

          {/* Main Heading */}
          <h1
            className={`text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 ${
              isRTL ? "font-arabic" : "font-english"
            }`}
          >
            {t("gallery.title") || "Event Gallery"}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            {t("gallery.description") ||
              "Discover our portfolio of successful events and celebrations that showcase our expertise in event management."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-white/80 text-sm lg:text-base">
                {t("gallery.stats.events") || "Events Completed"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-white/80 text-sm lg:text-base">
                {t("gallery.stats.cities") || "Cities Covered"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                98%
              </div>
              <div className="text-white/80 text-sm lg:text-base">
                {t("gallery.stats.satisfaction") || "Client Satisfaction"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white/20 rounded-full hidden lg:block" />
      <div className="absolute top-1/2 left-5 w-3 h-3 bg-white/30 rounded-full hidden lg:block" />
      <div className="absolute top-1/3 right-8 w-2 h-2 bg-white/40 rounded-full hidden lg:block" />
    </section>
  );
};

export default GalleryHero;
