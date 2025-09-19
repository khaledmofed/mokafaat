import React, { useState } from "react";
import {
  IoClose,
  IoPersonOutline,
  IoMailOutline,
  IoLocationOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { useInquiryModal } from "@context";
import useIsRTL from "@hooks/useIsRTL";

const InquiryModal: React.FC = () => {
  const { isOpen, closeModal, modalTitle, modalSubtitle } = useInquiryModal();
  const isRTL = useIsRTL();

  // Debug: طباعة حالة البوب أب
  console.log("InquiryModal render:", { isOpen, modalTitle, modalSubtitle });

  // إغلاق المودال بمفتاح ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("ESC key pressed, closing modal");
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      console.log("Modal opened - Press ESC to close or click outside");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // هنا يمكن إضافة منطق إرسال البيانات
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-all duration-200 flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-[#400198]">{modalTitle}</h2>
            <p className="text-gray-600 text-sm mt-1">{modalSubtitle}</p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
            title={isRTL ? "إغلاق النافذة (ESC)" : "Close modal (ESC)"}
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "الاسم الكامل" : "Full Name"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                  required
                />
                <IoPersonOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "رقم الهاتف" : "Phone Number"}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder={isRTL ? "أدخل رقم الهاتف" : "Enter phone number"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                  required
                />
                <IoCallOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "البريد الإلكتروني" : "Email"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={
                    isRTL ? "أدخل بريدك الإلكتروني" : "Enter your Email"
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                  required
                />
                <IoMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? "البلد" : "Country"}
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10 appearance-none"
                  required
                >
                  <option value="">
                    {isRTL ? "اختر بلدك" : "Select your Country"}
                  </option>
                  <option value="Turkey">{isRTL ? "تركيا" : "Turkey"}</option>
                  <option value="UAE">{isRTL ? "الإمارات" : "UAE"}</option>
                  <option value="Saudi Arabia">
                    {isRTL ? "المملكة العربية السعودية" : "Saudi Arabia"}
                  </option>
                  <option value="Kuwait">{isRTL ? "الكويت" : "Kuwait"}</option>
                  <option value="Qatar">{isRTL ? "قطر" : "Qatar"}</option>
                  <option value="Bahrain">
                    {isRTL ? "البحرين" : "Bahrain"}
                  </option>
                  <option value="Oman">{isRTL ? "عمان" : "Oman"}</option>
                  <option value="Jordan">{isRTL ? "الأردن" : "Jordan"}</option>
                  <option value="Lebanon">{isRTL ? "لبنان" : "Lebanon"}</option>
                  <option value="Egypt">{isRTL ? "مصر" : "Egypt"}</option>
                  <option value="Other">{isRTL ? "أخرى" : "Other"}</option>
                </select>
                <IoLocationOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isRTL ? "رسالة الاستفسار" : "Enquiry Message"}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={
                isRTL ? "أدخل رسالتك هنا" : "Enter your message here"
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#400198] hover:scale-105 transition-transform duration-300 text-sm px-8 py-3 font-semibold rounded-full text-white flex items-center gap-2"
            >
              <IoPaperPlaneOutline className="text-lg" />
              {isRTL ? "إرسال الرسالة" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;
