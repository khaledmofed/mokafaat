import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";

// Import gallery images for fallback
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

const OurGallery = () => {
  const { t } = useTranslation();

  // Fetch gallery images from API
  const { data: galleryResponse } = useGetQuery({
    endpoint: `${API_ENDPOINTS.getGallery}?page=1&perPage=18`,
  });

  // Use API data if available, otherwise fallback to static images
  const galleryImages = galleryResponse?.data?.gallery || [
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
    img1: galleryImages[3] || galleryImages[0],
    img2: galleryImages[1] || galleryImages[0],
    img3: galleryImages[2] || galleryImages[0],
    img4: galleryImages[0] || galleryImages[0],
    img5: galleryImages[4] || galleryImages[0],
    img6: galleryImages[5] || galleryImages[0],
    img7: galleryImages[6] || galleryImages[0],
    img8: galleryImages[7] || galleryImages[0],
  });

  // Update randomImages when galleryImages changes (from API)
  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setRandomImages({
        img1: galleryImages[3] || galleryImages[0],
        img2: galleryImages[1] || galleryImages[0],
        img3: galleryImages[2] || galleryImages[0],
        img4: galleryImages[0] || galleryImages[0],
        img5: galleryImages[4] || galleryImages[0],
        img6: galleryImages[5] || galleryImages[0],
        img7: galleryImages[6] || galleryImages[0],
        img8: galleryImages[7] || galleryImages[0],
      });
    }
  }, [galleryImages]);

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
          <div className=" flex justify-center items-center ">
            <div className="">
              <span className="text-[#fd671a] text-md font-semibold">
                {t("our-gallery.subtitle")}
              </span>

              {/* Main Heading */}
              <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {t("our-gallery.title")}
              </h2>
            </div>

            {/* Description */}
            <p className=" text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start">
              {t("our-gallery.description")}
            </p>
            <div className="lg:text-right">
              <a
                href="/gallery"
                className=" hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                {t("common.viewAll")} →
              </a>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

export default OurGallery;
