// Removed unused imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslate } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import { webApi } from "@network/services/mokafaatService";
import { contactFormSchema } from "@validations";
import { t } from "i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { BsSendSlash } from "react-icons/bs";
import { useIsRTL } from "@hooks";

type ContactFormValues = {
  fullName: string;
  mobileNumber: string;
  email: string;
  companyName: string | null;
  message: string;
};

const ContactForm = () => {
  const { translateValidationMessage } = useTranslate();
  const isRTL = useIsRTL();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    // Casting resolver due to mismatch between yup and RHF resolver generics
    resolver: yupResolver(
      contactFormSchema(translateValidationMessage)
    ) as unknown as import("react-hook-form").Resolver<ContactFormValues>,
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      companyName: null,
      message: "",
    },
  });

  const {
    mutate,
    data: response,
    isPending,
  } = useMutation({
    mutationFn: (params: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => webApi.contact(params),
  });

  const body = response?.data as
    | { status?: boolean; message?: string }
    | undefined;

  useEffect(() => {
    if (body?.status === true) {
      toast(t("messages.messageSent"));
      reset({
        fullName: "",
        email: "",
        mobileNumber: "",
        companyName: null,
        message: "",
      });
    } else if (body?.status === false && body?.message) {
      toast(body.message);
    }
  }, [body?.status, body?.message, reset]);

  const submitForm = (data: ContactFormValues) => {
    mutate({
      name: data.fullName,
      email: data.email,
      phone: data.mobileNumber,
      subject: data.companyName ?? "",
      message: data.message,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:w-2/3 w-full">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Two Column Input Section */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {isRTL ? "الاسم الكامل" : t("contact.fName")}
              </label>
              <div className="relative">
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                />
                <FaRegUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.fullName?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {isRTL ? "رقم الهاتف" : t("contact.mNumber")}
              </label>
              <div className="relative">
                <input
                  {...register("mobileNumber")}
                  type="tel"
                  placeholder={isRTL ? "أدخل رقم الهاتف" : "Enter phone number"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                />
                <FiPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.mobileNumber?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {isRTL ? "البريد الإلكتروني" : t("contact.email")}
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  placeholder={
                    isRTL ? "أدخل بريدك الإلكتروني" : "Enter your Email"
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                />
                <IoMailOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.email?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {isRTL ? "اسم الشركة" : t("contact.cName")}
              </label>
              <div className="relative">
                <input
                  {...register("companyName")}
                  type="text"
                  placeholder={isRTL ? "أدخل اسم الشركة" : "Enter your address"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent pr-10"
                />
                <IoLocationOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              {errors.companyName?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {isRTL ? "الرسالة" : t("contact.msg")}
          </label>
          <textarea
            {...register("message")}
            placeholder={isRTL ? "أدخل رسالتك هنا" : "Enter your message here"}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent resize-none"
          />
          {errors.message?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-0">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#400198] h-[45px]  justify-center hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <BsSendSlash className="text-lg" />
            )}
            {isRTL ? "إرسال" : t("contact.send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
