import { t } from "i18next";
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

const ServiceGallery = () => {
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
        <div className="space-y-6 container mx-auto mb-16 px-4 flex-mobile ">
          {/* Subtitle */}

          <div className="flex justify-center items-center ">
            <div className="">
              <span className="text-[#fd671a] text-md font-semibold">
                {t("service-gallery.subtitle")}
              </span>

              {/* Main Heading */}
              <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {t("service-gallery.title")}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start">
              {t("service-gallery.description")}
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4">
          {/* Gallery Grid */}
          <div className="flex gap-4 max-w-full overflow-hidden flex-mobile-flex-gallery-inner">
            {/* مجموعة 1 */}
            <div className="w-1/2 flex-mobile-flex-gallery-inner-w">
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
                    {/* Custom Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {t("service-gallery.image1.title")}
                        </h3>
                        <p className="text-sm opacity-90">
                          {t("service-gallery.image1.description")}
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
                    {/* Custom Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {t("service-gallery.image2.title")}
                        </h3>
                        <p className="text-sm opacity-90">
                          {t("service-gallery.image2.description")}
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
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {t("service-gallery.image3.title")}
                      </h3>
                      <p className="text-sm opacity-90">
                        {t("service-gallery.image3.description")}
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
                  {/* Custom Overlay with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">
                        {t("service-gallery.image4.title")}
                      </h3>
                      <p className="text-sm opacity-90">
                        {t("service-gallery.image4.description")}
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
                <div className="col-span-2 flex gap-4">
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        animationStates.img5 ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={randomImages.img5.image}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        animationStates.img5
                          ? "scale-110 rotate-1"
                          : "scale-100 rotate-0"
                      } group-hover:scale-105 group-hover:rotate-0`}
                    />
                    {/* Custom Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {t("service-gallery.image5.title")}
                        </h3>
                        <p className="text-sm opacity-90">
                          {t("service-gallery.image5.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
                    <div
                      className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        animationStates.img6 ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={randomImages.img6.image}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        animationStates.img6
                          ? "scale-110 -rotate-1"
                          : "scale-100 rotate-0"
                      } group-hover:scale-105 group-hover:rotate-0`}
                    />
                    {/* Custom Overlay with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-[#C13899]/50 to-transparent opacity-100 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-semibold mb-2">
                          {t("service-gallery.image6.title")}
                        </h3>
                        <p className="text-sm opacity-90">
                          {t("service-gallery.image6.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
                <div className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
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
                        {t("service-gallery.image7.title")}
                      </h3>
                      <p className="text-sm opacity-90">
                        {t("service-gallery.image7.description")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* صورة بالطول يمين */}
                <div className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
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
                        {t("service-gallery.image8.title")}
                      </h3>
                      <p className="text-sm opacity-90">
                        {t("service-gallery.image8.description")}
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

export default ServiceGallery;
