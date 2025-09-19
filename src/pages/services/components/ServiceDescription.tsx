import { useIsRTL } from "@hooks";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const ServiceDescription = () => {
  const isRTL = useIsRTL();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Subtitle */}
            <div className="text-[#fd671a] text-lg font-semibold">
              {isRTL ? "المستقلين" : "FREELANCERS"}
            </div>

            {/* Main Title */}
            <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {isRTL
                ? "محترفين ماهرين ومدربين جيداً"
                : "skilled, well-trained professionals"}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {isRTL
                ? "فريق المستقلين في الفعاليات لدينا متخصصون في إدارة الفعاليات مع التزام عميق بالجودة والتجارب الاستثنائية. نحن نضمن أن كل فعالية تترك انطباعاً لا يُنسى."
                : "Our event freelance team consists of specialized event management professionals with a deep commitment to quality and exceptional experiences. We ensure every event leaves an unforgettable impression."}
            </p>

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>

              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <div className="text-4xl mb-4">👥</div>
                  <p className="text-lg font-semibold">
                    {isRTL ? "صورة الفريق" : "Team Photo"}
                  </p>
                  <p className="text-sm opacity-75">
                    {isRTL
                      ? "رجل يرتدي قميص Mukafaat يتفاعل مع امرأة في عباية سوداء"
                      : "Man in purple Mukafaat shirt interacting with woman in black abaya"}
                  </p>
                </div>
              </div>
            </div>

            {/* Two Smaller Images */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top Image */}
              <div className="relative">
                <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-2xl mb-2">🎭</div>
                    <p className="text-sm font-semibold">
                      {isRTL ? "الفعالية الرياضية" : "Sport Event"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Image */}
              <div className="relative">
                <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-2xl mb-2">👔</div>
                    <p className="text-sm font-semibold">
                      {isRTL ? "فعالية رسمية" : "Formal Event"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
