import { useIsRTL } from "@hooks";
import coreValueImg from "@assets/images/core-value.png";
import coreValuePattern from "@assets/images/cure-value-pattern.png";

const CoreValues = () => {
  const isRTL = useIsRTL();

  const coreValues = [
    {
      id: 1,
      title: isRTL ? "العميل أولاً" : "Client First",
      description: isRTL
        ? "نحن نخلق تجارب لا تُنسى، في كل مرة"
        : "We create unforgettable experiences, every time.",
    },
    {
      id: 2,
      title: isRTL ? "تمكين المستقلين" : "Empower Freelancers",
      description: isRTL
        ? "نحن ندرب، ندعم، ونساعدهم على النمو"
        : "We train, support, and help them grow.",
    },
    {
      id: 3,
      title: isRTL ? "الابتكار الذكي" : "Innovate Smart",
      description: isRTL
        ? "نحن نستخدم التكنولوجيا لجعل الفعاليات أفضل وأسهل"
        : "We use tech to make events better and easier.",
    },
    {
      id: 4,
      title: isRTL ? "تقديم التميز" : "Deliver Excellence",
      description: isRTL ? "نحن نهتم بكل تفصيل" : "We care about every detail.",
    },
    {
      id: 5,
      title: isRTL ? "أقوى معاً" : "Stronger Together",
      description: isRTL
        ? "نحن نبني مجتمع عالمي داعم"
        : "We build a global, supportive community.",
    },
    {
      id: 6,
      title: isRTL ? "التصرف بالنزاهة" : "Act with Integrity",
      description: isRTL
        ? "نحن نبقى صادقين، مسؤولين، وشفافين"
        : "We stay honest, accountable, and transparent.",
    },
    {
      id: 7,
      title: isRTL ? "الاحتفال بالتنوع" : "Celebrate Diversity",
      description: isRTL
        ? "نحن نرحب بجميع الأصوات والمواهب"
        : "We welcome all voices and talents.",
    },
  ];

  return (
    <section className="py-0 bg-white flex-mobile-inner">
      <div className="flex flex-mobile-inner">
        {/* Left Section - Image */}
        <div className="relative w-1/2">
          <img
            src={coreValueImg}
            alt="Core Values Team"
            className="w-full h-[550px] object-cover"
          />
        </div>

        {/* Right Section - Core Values */}
        <div className="padding-mobile-inner bg-[#1D0843] p-20 lg:p-20 flex flex-col justify-center w-1/2 relative overflow-hidden">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            {isRTL ? "القيم الأساسية" : "Core Values"}
          </h2>

          <div className="space-y-6">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className={`flex items-start ${
                  isRTL ? "space-x-reverse space-x-4" : "space-x-4"
                }`}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-[#69aa3a] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {value.id}
                  </span>
                </div>
                <div className="flex-1">
                  {/* <h3 className="text-white font-bold text-lg mb-1">
                    {value.title}
                  </h3> */}
                  <p className="text-white text-sm leading-relaxed">
                    {value.title} - {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={`absolute top-0 w-full h-full transform z-9`}>
            <img
              src={coreValuePattern}
              alt="App Pattern"
              className="w-full h-full animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
