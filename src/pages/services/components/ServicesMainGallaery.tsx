// import { t } from "i18next";
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
} from "@assets";
import { useState, useEffect } from "react";
import { useIsRTL } from "@hooks";
import { useNavigate } from "react-router-dom";

const ServicesMainGallaery = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();

  const getServiceSlug = (id: number): string => {
    const serviceSlugs: Record<number, string> = {
      1: "event-management",
      2: "freelance-event-planners",
      3: "event-system-solutions",
      4: "equipment-rental-services",
      5: "strategic-promotion",
      6: "logistic-solutions",
    };
    return serviceSlugs[id] || "event-management";
  };

  const services = [
    {
      id: 1,
      title: isRTL ? "إدارة الفعاليات" : "Event Management",
      description: isRTL
        ? "حلول متخصصة لإدارة الفعاليات باحترافية عالية"
        : "Specialized and professional event management solutions",
    },
    {
      id: 2,
      title: isRTL ? "منظمو فعاليات مستقلون" : "Freelance Event Planners",
      description: isRTL
        ? "شبكة كبيرة من المخططين المستقلين الموثوقين"
        : "A large network of trusted freelance planners",
    },
    {
      id: 3,
      title: isRTL ? "حلول أنظمة الفعاليات" : "Event System Solutions",
      description: isRTL
        ? "أنظمة وتقنيات متكاملة لإدارة وتنظيم الفعاليات"
        : "Integrated systems and technology for event operations",
    },
    {
      id: 4,
      title: isRTL ? "تأجير المعدات" : "Equipment Renting",
      description: isRTL
        ? "تأجير معدات احترافية تغطي كل الاحتياجات"
        : "Professional rental equipment for every need",
    },
    {
      id: 5,
      title: isRTL ? "الترويج الاستراتيجي" : "Strategic Promotion",
      description: isRTL
        ? "حملات ترويجية فعّالة تصل لجمهورك المستهدف"
        : "Effective promotional campaigns that reach your audience",
    },
    {
      id: 6,
      title: isRTL ? "الحلول اللوجستية" : "Logistic Solutions",
      description: isRTL
        ? "حلول لوجستية ذكية وموثوقة"
        : "Smart and reliable logistics solutions",
    },
  ];
  const serviceCards = [
    services[0],
    services[1],
    services[2],
    services[3],
    services[4],
    services[5],
  ];
  // Gallery images from local assets
  const galleryImages = [
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
  ];

  // State for random images
  const [randomImages, setRandomImages] = useState({
    img1: galleryImages[3],
    img2: galleryImages[1],
    img3: galleryImages[2],
    img4: galleryImages[0],
    img5: galleryImages[4],
    img6: galleryImages[5],
    img7: galleryImages[6],
    img8: galleryImages[7],
  });

  // State for animation effects
  const [animationStates, setAnimationStates] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
    img5: false,
    img6: false,
    img7: false,
    img8: false,
  });

  // Function to get random image
  const getRandomImage = () => {
    return galleryImages[Math.floor(Math.random() * galleryImages.length)];
  };

  // Function to trigger animation
  const triggerAnimation = (imageKey: string) => {
    setAnimationStates((prev) => ({ ...prev, [imageKey]: true }));
    setTimeout(() => {
      setAnimationStates((prev) => ({ ...prev, [imageKey]: false }));
    }, 600);
  };

  // Update images at different intervals
  useEffect(() => {
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
      setInterval(() => {
        triggerAnimation("img5");
        setRandomImages((prev) => ({ ...prev, img5: getRandomImage() }));
      }, 4500),
      setInterval(() => {
        triggerAnimation("img6");
        setRandomImages((prev) => ({ ...prev, img6: getRandomImage() }));
      }, 3800),
      setInterval(() => {
        triggerAnimation("img7");
        setRandomImages((prev) => ({ ...prev, img7: getRandomImage() }));
      }, 4200),
      setInterval(() => {
        triggerAnimation("img8");
        setRandomImages((prev) => ({ ...prev, img8: getRandomImage() }));
      }, 4800),
    ];

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  return (
    <section className="py-16" style={{ backgroundColor: "#F7F8FB" }}>
      <div className="">
        {/* Header Section */}
        <div className="space-y-6 container mx-auto mb-16 px-4 flex-mobile">
          {/* Subtitle */}
          <div className="flex justify-center items-center ">
            <div className="">
              <span className="text-[#fd671a] text-md font-semibold">
                {isRTL ? "ما يمكننا تقديمه" : "What we can provide"}
              </span>

              {/* Main Heading */}
              <h2 className=" font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {isRTL ? "خدماتنا" : "Our Services"}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start">
              {isRTL
                ? "إيفنت ماسترز هو شريكك المفضل لجميع احتياجات إدارة الفعاليات في المملكة العربية السعودية. مع التركيز المخصص على تقديم حلول شاملة."
                : "Mukafaat is your premier partner for all your event management needs in Saudi Arabia. With a dedicated focus on providing comprehensive solutions."}
            </p>
          </div>
        </div>

        {/* Services displayed within gallery cards */}

        {/* Gallery Grid */}
        <div className="space-y-6 container mx-auto mb-16 px-4 flex-mobile-gallery-inner">
          <div className="flex gap-4 max-w-full overflow-hidden flex-mobile-flex-gallery-inner">
            {/* مجموعة 1 */}
            <div className="w-1/2 flex-mobile-flex-gallery-inner-w">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateRows: "auto auto" }}
              >
                {/* صورتان فوق بعض يسار */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[0].id)}`)
                  }
                  className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img1 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img1.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img1 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[0].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[0].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[1].id)}`)
                  }
                  className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
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
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[1].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[1].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة بالطول يمين */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[2].id)}`)
                  }
                  className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
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
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[2].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[2].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* مجموعة 2 */}
            <div className="w-1/2 flex-mobile-flex-gallery-inner-w second-gallery-row">
              <div
                className="grid grid-cols-3 gap-4"
                style={{ gridTemplateRows: "auto auto" }}
              >
                {/* صورتان فوق بعض يسار */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[3].id)}`)
                  }
                  className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img7 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img2.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img7 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[3].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[3].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[4].id)}`)
                  }
                  className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img7 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img7.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img7 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[4].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[4].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة بالطول يمين */}
                <div
                  onClick={() =>
                    navigate(`/services/${getServiceSlug(serviceCards[5].id)}`)
                  }
                  className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                      animationStates.img8 ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <img
                    src={randomImages.img8.image}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      animationStates.img8 ? "scale-110" : "scale-100"
                    } group-hover:scale-105`}
                  />
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {serviceCards[5].title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {serviceCards[5].description}
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

export default ServicesMainGallaery;
