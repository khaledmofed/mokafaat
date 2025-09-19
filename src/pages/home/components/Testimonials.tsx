import React, { useState, useEffect } from "react";
import { t } from "i18next";
import { comma, OurAppPattern, User1, User2 } from "@assets";
import { useIsRTL } from "@hooks";

interface TestimonialCardProps {
  text: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  name,
  title,
  company,
  image,
}) => {
  const isRTL = useIsRTL();
  return (
    <div className="bg-white rounded-md p-0 relative">
      {/* Testimonial text */}
      <p
        className={`text-gray-600 text-sm leading-relaxed mb-6 ${
          isRTL ? "text-right" : "text-left"
        }`}
        style={{
          background: "#F7F8FB",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        {text}
      </p>

      {/* Author section */}
      <div
        className={`flex items-center justify-between px-14 py-4 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <div className={`flex items-center gap-3`}>
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
            <p className="text-gray-500 text-xs">
              {company}, {title}
            </p>
          </div>
        </div>

        {/* Dashed line */}
        <div className="flex-1 mx-4 border-t border-dashed border-gray-300"></div>

        {/* Quote icon */}
        <div className="w-10 h-10  rounded-full flex items-center justify-center">
          <img src={comma} alt="comma" className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isRTL = useIsRTL();
  const testimonials = [
    {
      text: t("home.testimonials.items.1.text"),
      name: t("home.testimonials.items.1.name"),
      title: t("home.testimonials.items.1.title"),
      company: t("home.testimonials.items.1.company"),
      image: User1, // fallback to existing asset or replace with dedicated avatar if available
    },
    {
      text: t("home.testimonials.items.2.text"),
      name: t("home.testimonials.items.2.name"),
      title: t("home.testimonials.items.2.title"),
      company: t("home.testimonials.items.2.company"),
      image: User2,
    },
    {
      text: t("home.testimonials.items.3.text"),
      name: t("home.testimonials.items.3.name"),
      title: t("home.testimonials.items.3.title"),
      company: t("home.testimonials.items.3.company"),
      image: User1,
    },
    {
      text: t("home.testimonials.items.4.text"),
      name: t("home.testimonials.items.4.name"),
      title: t("home.testimonials.items.4.title"),
      company: t("home.testimonials.items.4.company"),
      image: User2,
    },
  ];

  // Calculate slides based on screen size
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [totalSlides, setTotalSlides] = useState(
    Math.ceil(testimonials.length / 2)
  );

  useEffect(() => {
    const updateSlidesPerView = () => {
      const newSlidesPerView = window.innerWidth < 1024 ? 1 : 2;
      setSlidesPerView(newSlidesPerView);
      setTotalSlides(Math.ceil(testimonials.length / newSlidesPerView));
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);

    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="bg-white py-20 relative ">
      <div
        className={`absolute  transform -top-14 ${
          isRTL ? "right-0" : "left-0"
        } z-0`}
      >
        <img
          src={OurAppPattern}
          alt="App Pattern"
          className="w-48 h-auto animate-float"
        />
      </div>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="space-y-6 container mx-auto mb-10 flex-mobile">
          {/* Subtitle */}
          <div className="flex justify-center items-center ">
            <div className="">
              <span className="text-[#fd671a] text-md font-semibold">
                {t("home.testimonials.subtitle")}
              </span>

              {/* Main Heading */}
              <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {t("home.testimonials.title")}
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-gray-600 text-md leading-relaxed max-w-2xl mx-auto ${
                isRTL ? "text-right" : "text-start"
              }`}
            >
              {t("home.testimonials.description")}
            </p>

            {/* Navigation arrows */}
            <div className="flex gap-3 mt-6 lg:mt-0 mobile-arrows">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRTL ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  {testimonials
                    .slice(
                      slideIndex * slidesPerView,
                      slideIndex * slidesPerView + slidesPerView
                    )
                    .map((testimonial, index) => (
                      <div key={index} className="w-full lg:w-1/2">
                        <TestimonialCard {...testimonial} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentSlide ? "bg-[#fd671a]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
