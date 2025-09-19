import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useIsRTL } from "@hooks";
import { FAQImage } from "@assets";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const isRTL = useIsRTL();

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: isRTL ? "ما هي منصة مكافئات؟" : "What is Mukafaat platform?",
      answer: isRTL
        ? "مكافئات هي المنصة الرائدة في المملكة العربية السعودية لتوفير المال والاستفادة من أفضل العروض والخصومات على البطاقات الائتمانية والكوبونات والحجوزات السياحية."
        : "Mukafaat is the leading platform in Saudi Arabia for saving money and benefiting from the best offers and discounts on credit cards, coupons, and travel bookings.",
    },
    {
      id: 2,
      question: isRTL
        ? "كيف يمكنني الاستفادة من عروض مكافئات؟"
        : "How can I benefit from Mukafaat offers?",
      answer: isRTL
        ? "يمكنك الاستفادة من عروض مكافئات من خلال تصفح العروض المتاحة، اختيار البطاقة الائتمانية المناسبة، استخدام الكوبونات المتاحة، أو حجز رحلاتك بأسعار مميزة."
        : "You can benefit from Mukafaat offers by browsing available offers, choosing the right credit card, using available coupons, or booking your trips at competitive prices.",
    },
    {
      id: 3,
      question: isRTL
        ? "هل خدمات مكافئات مجانية؟"
        : "Are Mukafaat services free?",
      answer: isRTL
        ? "نعم، جميع خدمات مكافئات مجانية تماماً. نحن نربطك بأفضل العروض والخصومات المتاحة دون أي رسوم إضافية أو تكاليف خفية."
        : "Yes, all Mukafaat services are completely free. We connect you to the best available offers and discounts without any additional fees or hidden costs.",
    },
    {
      id: 4,
      question: isRTL
        ? "هل يمكنني استخدام مكافئات في جميع أنحاء المملكة؟"
        : "Can I use Mukafaat throughout the Kingdom?",
      answer: isRTL
        ? "نعم، خدمات مكافئات متاحة في جميع أنحاء المملكة العربية السعودية. نعمل مع شركاء محليين في جميع المدن الرئيسية لضمان أفضل الخدمات."
        : "Yes, Mukafaat services are available throughout Saudi Arabia. We work with local partners in all major cities to ensure the best services.",
    },
    {
      id: 5,
      question: isRTL
        ? "كيف يمكنني التواصل مع فريق مكافئات؟"
        : "How can I contact Mukafaat team?",
      answer: isRTL
        ? "يمكنك التواصل معنا عبر الموقع الإلكتروني، تطبيق الهاتف المحمول، أو من خلال خدمة العملاء المتاحة على مدار الساعة. نحن هنا لمساعدتك في أي وقت."
        : "You can contact us through our website, mobile app, or through our 24/7 customer service. We are here to help you anytime.",
    },
  ];

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20">
      <div className="container mx-auto pt-4 pb-8 px-4 lg:px-0">
        {/* Main Title */}
        <div className="text-center lg:mb-16 mb-8">
          <h2
            className="text-[#400198] text-3xl font-bold"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "الأسئلة الشائعة" : "Frequently Ask Questions"}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Section - FAQ List */}
          <div className="space-y-4 w-full lg:w-1/2">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#F2F2F2] shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium flex-1 px-4">
                    {item.question}
                  </span>
                  <IoAdd
                    className={`text-[#fff] bg-[#400198] rounded-full text-2xl transition-transform duration-300 ${
                      expandedItems.includes(item.id) ? "rotate-45" : ""
                    }`}
                  />
                </div>

                {expandedItems.includes(item.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section - FAQ Image & Text */}
          <div className="hidden lg:block text-center w-1/2">
            {/* FAQ Image */}
            <div className="relative mb-6">
              <img
                src={FAQImage}
                alt="FAQ Question Mark"
                className="w-[209px] h-auto mx-auto object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h3
                className="text-3xl font-bold text-[#400198]"
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {isRTL ? "أي سؤال؟" : "Any Question?"}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                {isRTL
                  ? "لديك أسئلة حول خدمات مكافئات؟ نحن هنا للإجابة عليها"
                  : "Have questions about Mukafaat services? We're here to answer them"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
