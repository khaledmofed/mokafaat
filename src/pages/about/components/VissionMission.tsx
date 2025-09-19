import React from "react";
import { useIsRTL } from "@hooks";
import peopleImg from "@assets/images/people.png";

interface VissionMissionProps {
  vissionDescription?: string;
  missionDescription?: string;
}

const VissionMission: React.FC<VissionMissionProps> = ({
  vissionDescription,
  missionDescription,
}) => {
  const isRTL = useIsRTL();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Our Vision */}
          <div
            className={`text-center md:text-left ${
              isRTL ? "md:text-right" : ""
            }`}
          >
            <div
              className={`flex justify-center ${
                isRTL ? "md:justify-end" : "md:justify-start"
              } mb-6`}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img
                  src={peopleImg}
                  alt="People Icon"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <h3
              className={`text-2xl md:text-2xl font-bold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {isRTL ? "رؤيتنا" : "Our Vision"}
            </h3>
            <blockquote
              className={`text-gray-600 leading-relaxed ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {isRTL
                ? vissionDescription ||
                  "لرفع مستوى تجربة الفعاليات في جميع أنحاء العالم من خلال تمكين جيل جديد من المستقلين المهرة - الجمع بين التكنولوجيا الذكية والرعاية التي لا مثيل لها لكل رحلة عملاء."
                : vissionDescription ||
                  "To elevate the event experience worldwide by empowering a new generation of skilled freelancers— combining smart technology with unmatched care for every customer journey."}
            </blockquote>
          </div>

          {/* Our Mission */}
          <div
            className={`text-center md:text-left ${
              isRTL ? "md:text-right" : ""
            }`}
          >
            <div
              className={`flex justify-center ${
                isRTL ? "md:justify-end" : "md:justify-start"
              } mb-6`}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <img
                  src={peopleImg}
                  alt="People Icon"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <h3
              className={`text-2xl md:text-2xl font-bold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {isRTL ? "مهمتنا" : "Our Mission"}
            </h3>
            <blockquote
              className={`text-gray-600 leading-relaxed ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {isRTL
                ? missionDescription ||
                  "مهمتنا هي تمكين المستقلين المتحمسين بالأدوات والتدريب والدعم الذي يحتاجونه لخلق تجارب فعاليات سلسة لا تُنسى - مدفوعة بالتكنولوجيا الذكية والالتزام العميق برحلة كل عميل."
                : missionDescription ||
                  "Our mission is to empower passionate freelancers with the tools, training, and support they need to create seamless, unforgettable event experiences—driven by smart technology and a deep commitment to every customer's journey."}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VissionMission;
