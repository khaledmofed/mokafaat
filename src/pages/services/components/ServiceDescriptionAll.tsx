import { useIsRTL } from "@hooks";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  G1,
  G2,
  G3,
  G4,
  G5,
  G6,
  G7,
  G8,
  G9,
  G10,
  G11,
  G12,
  G13,
  G14,
  G15,
  G16,
  G17,
  G18,
  BackService,
} from "@assets";
import { useState, useEffect, useMemo } from "react";

const ServiceDescriptionAll = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const { serviceSlug } = useParams();

  // Gallery images from local assets
  const galleryImages = useMemo(
    () => [
      {
        id: 1,
        image: G1,
        title: "Corporate Event 2025",
      },
      {
        id: 2,
        image: G2,
        title: "Wedding Ceremony",
      },
      {
        id: 3,
        image: G3,
        title: "Conference Hall",
      },
      {
        id: 4,
        image: G4,
        title: "Birthday Party",
      },
      {
        id: 5,
        image: G5,
        title: "Business Meeting",
      },
      {
        id: 6,
        image: G6,
        title: "Gala Dinner",
      },
      {
        id: 7,
        image: G7,
        title: "Product Launch",
      },
      {
        id: 8,
        image: G8,
        title: "Exhibition Event",
      },
      {
        id: 9,
        image: G9,
        title: "Corporate Event 2025",
      },
      {
        id: 10,
        image: G10,
        title: "Wedding Ceremony",
      },
      {
        id: 11,
        image: G11,
        title: "Conference Hall",
      },
      {
        id: 12,
        image: G12,
        title: "Birthday Party",
      },
      {
        id: 13,
        image: G13,
        title: "Business Meeting",
      },
      {
        id: 14,
        image: G14,
        title: "Gala Dinner",
      },
      {
        id: 15,
        image: G15,
        title: "Product Launch",
      },
      {
        id: 16,
        image: G16,
        title: "Exhibition Event",
      },
      {
        id: 17,
        image: G17,
        title: "Corporate Event 2025",
      },
      {
        id: 18,
        image: G18,
        title: "Wedding Ceremony",
      },
    ],
    []
  );

  // State for random images
  const [randomImages, setRandomImages] = useState({
    img1: galleryImages[3],
    img2: galleryImages[1],
    img3: galleryImages[2],
    img4: galleryImages[0],
  });

  // State for animation effects
  const [animationStates, setAnimationStates] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  // Function to trigger animation
  const triggerAnimation = (imageKey: string) => {
    setAnimationStates((prev) => ({ ...prev, [imageKey]: true }));
    setTimeout(() => {
      setAnimationStates((prev) => ({ ...prev, [imageKey]: false }));
    }, 600);
  };

  // Update images at different intervals
  useEffect(() => {
    const getRandomImage = () =>
      galleryImages[Math.floor(Math.random() * galleryImages.length)];

    const intervals = [
      setInterval(() => {
        triggerAnimation("img1");
        setRandomImages((prev) => ({ ...prev, img1: getRandomImage() }));
      }, 3000),
      setInterval(() => {
        triggerAnimation("img2");
        setRandomImages((prev) => ({ ...prev, img2: getRandomImage() }));
      }, 4000),
      setInterval(() => {
        triggerAnimation("img3");
        setRandomImages((prev) => ({ ...prev, img3: getRandomImage() }));
      }, 3500),
      setInterval(() => {
        triggerAnimation("img4");
        setRandomImages((prev) => ({ ...prev, img4: getRandomImage() }));
      }, 5000),
    ];

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [galleryImages]);

  // Service details based on slug - matching HeroSlider slides
  const getServiceDetails = (slug: string) => {
    const services = {
      "event-management": {
        title: isRTL
          ? "إدارة الفعاليات المتخصصة"
          : "Specialized Event Management",
        subtitle: isRTL ? "إدارة الفعاليات" : "EVENT MANAGEMENT",
        description: isRTL
          ? "نقدم خدمات إدارة فعاليات متخصصة وشاملة لضمان نجاح فعاليتك. فريقنا المحترف يغطي أكثر من 250 موقع في جميع أنحاء المملكة."
          : "We provide specialized and comprehensive event management services to ensure the success of your event. Our professional team covers more than 250 venues across the Kingdom.",
        features: isRTL
          ? [
              "تغطية أكثر من 250 موقع",
              "فريق محترف ومتخصص",
              "خدمات شاملة ومتكاملة",
              "تجربة عالية في إدارة الفعاليات",
            ]
          : [
              "Coverage of 250+ venues",
              "Professional and specialized team",
              "Comprehensive and integrated services",
              "High experience in event management",
            ],
      },
      "freelance-event-planners": {
        title: isRTL
          ? "محترفون ماهرون ومدربون تدريبًا جيدًا"
          : "skilled, well-trained professionals ",
        subtitle: isRTL ? "المستقلين" : "FREELANCERS",
        description: isRTL
          ? "يتألف فريقنا المستقل لتنظيم الفعاليات من محترفين ماهرين ومدربين تدريبًا عاليًا، يُقدمون التميز في كل دور، بدءًا من خدمات الضيوف والعمليات وصولًا إلى الدعم الفني والترفيه. مع التزامهم بالجودة والموثوقية، يضمنون تنفيذًا سلسًا ويقدمون تجارب استثنائية في كل فعالية."
          : "Our event freelance team consists of skilled, well-trained professionals who bring excellence to every role—from guest services and operations to technical support and entertainment. With a commitment to quality and reliability, they ensure smooth execution and deliver exceptional experiences at every event.",
        features: isRTL
          ? [
              "أكثر من 10,000 مستقل محترف",
              "مدربين تدريباً عالياً",
              "خبرة في جميع أنواع الفعاليات",
              "أكثر من 670 عميل سعيد",
            ]
          : [
              "More than 10,000 professional freelancers",
              "Highly trained professionals",
              "Experience in all event types",
              "More than 670 happy clients",
            ],
      },
      "event-system-solutions": {
        title: isRTL
          ? "حلول نظام الفعاليات الشاملة"
          : "Comprehensive Event System Solutions",
        subtitle: isRTL ? "حلول نظام الفعاليات" : "EVENT SYSTEM SOLUTION",
        description: isRTL
          ? "نقدم حلول نظام فعاليات شاملة ومتطورة لضمان إدارة فعالياتك بكفاءة عالية. فريقنا المحترف يدير أكثر من 500 فعالية بنجاح."
          : "We provide comprehensive and advanced event system solutions to ensure efficient management of your events. Our professional team successfully manages more than 500 events.",
        features: isRTL
          ? [
              "أكثر من 500 فعالية تم إدارتها",
              "حلول تقنية متطورة",
              "إدارة شاملة ومتكاملة",
              "نظام ذكي ومتطور",
            ]
          : [
              "More than 500 events managed",
              "Advanced technical solutions",
              "Comprehensive and integrated management",
              "Smart and advanced system",
            ],
      },
      "equipment-rental-services": {
        title: isRTL
          ? "خدمات تأجير المعدات الاحترافية"
          : "Professional Equipment Rental Services",
        subtitle: isRTL ? "تأجير المعدات" : "EQUIPMENT RENTING",
        description: isRTL
          ? "نقدم خدمات تأجير معدات احترافية عالية الجودة لضمان نجاح فعاليتك. لدينا أكثر من 1000 قطعة معدات متنوعة ومتطورة."
          : "We provide professional high-quality equipment rental services to ensure the success of your event. We have more than 1000 diverse and advanced equipment items.",
        features: isRTL
          ? [
              "أكثر من 1000 قطعة معدات",
              "معدات متنوعة ومتطورة",
              "جودة عالية وموثوقة",
              "خدمة تأجير احترافية",
            ]
          : [
              "More than 1000 equipment items",
              "Diverse and advanced equipment",
              "High quality and reliable",
              "Professional rental service",
            ],
      },
      "strategic-promotion": {
        title: isRTL ? "الترويج الاستراتيجي" : "Strategic Promotion",
        subtitle: isRTL ? "الترويج" : "PROMOTING",
        description: isRTL
          ? "نقدم خدمات ترويج استراتيجية تدفع نتائج حقيقية لضمان نجاح فعاليتك. فريقنا المحترف يضمن وصول رسالتك للجمهور المستهدف."
          : "We provide strategic promotion services that drive real results to ensure the success of your event. Our professional team ensures your message reaches the target audience.",
        features: isRTL
          ? [
              "أكثر من 670 عميل سعيد",
              "ترويج استراتيجي فعال",
              "نتائج حقيقية وملموسة",
              "وصول للجمهور المستهدف",
            ]
          : [
              "More than 670 happy clients",
              "Effective strategic promotion",
              "Real and tangible results",
              "Reaching target audience",
            ],
      },
      "logistic-solutions": {
        title: isRTL
          ? "الحلول اللوجستية الذكية والموثوقة"
          : "Smart & Reliable Logistic Solutions",
        subtitle: isRTL ? "الحلول اللوجستية" : "LOGISTIC SOLUTION",
        description: isRTL
          ? "نقدم حلول لوجستية ذكية وموثوقة لضمان سير فعاليتك بسلاسة وكفاءة. فريقنا المحترف يضمن تنظيم مثالي لجميع التفاصيل اللوجستية."
          : "We provide smart and reliable logistic solutions to ensure smooth and efficient flow of your event. Our professional team ensures perfect organization of all logistic details.",
        features: isRTL
          ? [
              "أكثر من 10,000 مستقل محترف",
              "حلول لوجستية ذكية",
              "أكثر من 670 عميل سعيد",
              "تنظيم مثالي وموثوق",
            ]
          : [
              "More than 10,000 professional freelancers",
              "Smart logistic solutions",
              "More than 670 happy clients",
              "Perfect and reliable organization",
            ],
      },
      "hosting-services": {
        title: isRTL
          ? "خدمة المضيفين المحترفين"
          : "Professional Hosting Service",
        subtitle: isRTL ? "المضيفين" : "HOSTS",
        description: isRTL
          ? "نقدم مضيفين محترفين مدربين تدريباً عالياً لضمان استقبال ضيوفك بأفضل طريقة ممكنة. فريقنا من المضيفين يتميز باللباقة والكفاءة في التعامل مع جميع أنواع الفعاليات."
          : "We provide professionally trained hosts to ensure your guests are welcomed in the best possible way. Our hosting team is characterized by politeness and efficiency in dealing with all types of events.",
        features: isRTL
          ? [
              "مضيفين مدربين تدريباً عالياً",
              "لباقة في التعامل مع الضيوف",
              "خبرة في جميع أنواع الفعاليات",
              "خدمة 24/7",
            ]
          : [
              "Highly trained hosts",
              "Polite guest interaction",
              "Experience in all event types",
              "24/7 service",
            ],
      },
      "security-services": {
        title: isRTL ? "خدمة الحراس الأمنيين" : "Security Guards Service",
        subtitle: isRTL ? "الحراس" : "GUARDS",
        description: isRTL
          ? "نضمن أمان فعاليتك مع فريق من الحراس المحترفين المدربين على أعلى المستويات. حراسنا يتميزون باليقظة والكفاءة في حماية الضيوف والممتلكات."
          : "We ensure the security of your event with a team of professional guards trained to the highest standards. Our guards are characterized by vigilance and efficiency in protecting guests and property.",
        features: isRTL
          ? [
              "حراس مدربين على أعلى المستويات",
              "حماية شاملة للفعالية",
              "مراقبة مستمرة",
              "استجابة سريعة للطوارئ",
            ]
          : [
              "Guards trained to highest standards",
              "Comprehensive event protection",
              "Continuous monitoring",
              "Rapid emergency response",
            ],
      },
      "cleaning-services": {
        title: isRTL ? "خدمة التنظيف المتخصصة" : "Specialized Cleaning Service",
        subtitle: isRTL ? "المنظفين" : "CLEANERS",
        description: isRTL
          ? "نقدم خدمات تنظيف متخصصة لضمان بيئة نظيفة ومريحة لضيوفك. فريق التنظيف لدينا مدرب على أعلى معايير النظافة والجودة."
          : "We provide specialized cleaning services to ensure a clean and comfortable environment for your guests. Our cleaning team is trained to the highest standards of hygiene and quality.",
        features: isRTL
          ? [
              "تنظيف متخصص ومهني",
              "استخدام أحدث المعدات",
              "مواد تنظيف آمنة",
              "خدمة ما قبل وبعد الفعالية",
            ]
          : [
              "Specialized and professional cleaning",
              "Use of latest equipment",
              "Safe cleaning materials",
              "Pre and post-event service",
            ],
      },
      "catering-services": {
        title: isRTL ? "خدمة الطعام والضيافة" : "Food and Hospitality Service",
        subtitle: isRTL ? "المطاعم" : "CATERING",
        description: isRTL
          ? "نقدم خدمات طعام وضيافة عالية الجودة لضمان تجربة طعام رائعة لضيوفك. فريقنا من الطهاة المحترفين يعد أطباقاً شهية ومتنوعة."
          : "We provide high-quality food and hospitality services to ensure an amazing dining experience for your guests. Our team of professional chefs prepares delicious and diverse dishes.",
        features: isRTL
          ? [
              "طعام عالي الجودة",
              "طهاة محترفين",
              "قوائم طعام متنوعة",
              "خدمة ضيافة شاملة",
            ]
          : [
              "High-quality food",
              "Professional chefs",
              "Diverse menus",
              "Comprehensive hospitality service",
            ],
      },
    };
    return (
      services[slug as keyof typeof services] || {
        title: "Service Details",
        subtitle: "SERVICE",
        description: "Professional service details",
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      }
    );
  };

  const serviceDetails = getServiceDetails(serviceSlug || "event-management");

  // Service cards data
  const serviceCards = useMemo(
    () => [
      {
        id: 1,
        title: t("home.serviceCards.cards.title"),
        description: t("home.serviceCards.cards.description"),
        icon: "💳",
        color: "from-blue-500 to-purple-600",
      },
      {
        id: 2,
        title: t("home.serviceCards.coupons.title"),
        description: t("home.serviceCards.coupons.description"),
        icon: "🎫",
        color: "from-green-500 to-teal-600",
      },
      {
        id: 3,
        title: t("home.serviceCards.bookings.title"),
        description: t("home.serviceCards.bookings.description"),
        icon: "📅",
        color: "from-orange-500 to-red-600",
      },
      {
        id: 4,
        title: t("home.serviceCards.discounts.title"),
        description: t("home.serviceCards.discounts.description"),
        icon: "🏷️",
        color: "from-pink-500 to-purple-600",
      },
    ],
    [t]
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex  gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="w-1/4 space-y-8 space-y-mobile">
            {/* Subtitle */}
            <div className="text-[#fd671a] text-lg font-semibold">
              {serviceDetails.subtitle}
            </div>

            {/* Main Title */}
            <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight transform-capitalize">
              {serviceDetails.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {serviceDetails.description}
            </p>

            {/* Features List */}
            {/* <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {isRTL ? "المميزات الرئيسية:" : "Key Features:"}
              </h3>
              <ul className="space-y-2">
                {serviceDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#fd671a] rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* App Download Buttons */}
          </div>

          {/* Right Column - Gallery Grid */}
          <div className="w-3/4  gap-4 max-w-full overflow-hidden">
            {/* مجموعة 1 */}
            <div className="w-1/1">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateRows: "auto auto" }}
              >
                {/* صورتان فوق بعض يسار */}
                <div className="col-span-2 flex gap-4">
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        animationStates.img1 ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={randomImages.img1.image}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        animationStates.img1
                          ? "scale-110 rotate-1"
                          : "scale-100 rotate-0"
                      } group-hover:scale-105 group-hover:rotate-0`}
                    />
                    {/* Custom Overlay with Service Card */}
                    <div
                      className="absolute inset-0 opacity-100 flex items-end"
                      style={{
                        backgroundImage: `url(${BackService})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent"></div>
                      {/* Text content */}
                      <div className="relative p-4 text-white z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {serviceCards[0].title}
                          </h3>
                        </div>
                        <p className="text-sm opacity-90">
                          {serviceCards[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        animationStates.img2 ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={randomImages.img2.image}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        animationStates.img2
                          ? "scale-110 -rotate-1"
                          : "scale-100 rotate-0"
                      } group-hover:scale-105 group-hover:rotate-0`}
                    />
                    {/* Custom Overlay with Service Card */}
                    <div
                      className="absolute inset-0 opacity-100 flex items-end"
                      style={{
                        backgroundImage: `url(${BackService})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent"></div>
                      {/* Text content */}
                      <div className="relative p-4 text-white z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">
                            {serviceCards[1].title}
                          </h3>
                        </div>
                        <p className="text-sm opacity-90">
                          {serviceCards[1].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img3 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img3.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img3 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Service Card */}
                  <div
                    className="absolute inset-0 opacity-100 flex items-end"
                    style={{
                      backgroundImage: `url(${BackService})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent"></div>
                    {/* Text content */}
                    <div className="relative p-4 text-white z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {serviceCards[2].title}
                        </h3>
                      </div>
                      <p className="text-sm opacity-90">
                        {serviceCards[2].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة بالطول يمين */}
                <div className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img4 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img4.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img4 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Service Card */}
                  <div
                    className="absolute inset-0 opacity-100 flex items-end"
                    style={{
                      backgroundImage: `url(${BackService})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent"></div>
                    {/* Text content */}
                    <div className="relative p-4 text-white z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {serviceCards[3].title}
                        </h3>
                      </div>
                      <p className="text-sm opacity-90">
                        {serviceCards[3].description}
                      </p>
                    </div>
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

export default ServiceDescriptionAll;
