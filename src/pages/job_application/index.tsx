import { ChangePageTitle } from "@components";
import { t } from "i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslate } from "@hooks";
import { useEffect, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { GenderModel } from "@entities";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobApplicationSchema } from "@validations";
import usePostRequest from "@hooks/api/usePostRequest";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@constants";
import { AboutPattern } from "@assets";
import { useIsRTL } from "@hooks";
import { GetStarted } from "@pages/home/components";
import { FiMapPin, FiCalendar, FiClock, FiBriefcase } from "react-icons/fi";

type JobApplicationFormValues = {
  fullName: string;
  email: string;
  mobileNumber: string;
  idNumber: string;
  education: string;
  bio: string;
};

type JobApplicationPayload = {
  photo: File | null;
  fullName: string;
  email: string;
  mobileNumber: string;
  idType: string | undefined;
  idNumber: string;
  idPicture: File | null;
  idExpirationDate: File | null;
  nationality: string;
  gender: number | null | undefined;
  birthDate: Date | null;
  education: string;
  cityId: string | number | undefined;
  cv: File | null;
  bio: string;
  experiences: string;
};

const JobApplicationHero = ({ jobTitle }: { jobTitle: string }) => {
  const titleFontType = useIsRTL()
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[100px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30"></div>
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("job-application.title", { defaultValue: "Job Application" })}
        </h1>

        <div
          className="flex items-center justify-center space-x-2 text-sm md:text-base wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <Link to="/" className="text-white hover:text-purple-300 text-xs">
            {t("home.navbar.home")}
          </Link>
          <span className="text-white text-xs">|</span>
          <Link
            to={"/jobs"}
            className="text-white hover:text-purple-300 text-xs"
          >
            {t("careers.title", { defaultValue: "Jobs" })}
          </Link>
          <span className="text-white text-xs">|</span>
          <span className="text-purple-300 font-medium text-xs">
            {jobTitle}
          </span>
        </div>
      </div>
      <div className={`absolute -bottom-10 transform z-9`}>
        <img
          src={AboutPattern}
          alt="App Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

const JobApplication = () => {
  const { id: jobId } = useParams();
  const location = useLocation() as {
    state?: { title?: string; titleAr?: string };
  };
  const isRTL = useIsRTL();
  ChangePageTitle({
    pageTitle: t("job-application.title"),
  });
  const navigate = useNavigate();
  const { translateValidationMessage } = useTranslate();
  const [nationality, setNationality] = useState<string>("SA");
  const [birthDate, setBirthDate] = useState<Nullable<Date>>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderModel | null>(
    null
  );
  const [genderError, setGenderError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobApplicationSchema(translateValidationMessage)),
  });

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequest({
    endpoint: `${API_ENDPOINTS.getJobs}/${jobId}/apply`,
  });

  const submitForm = (data: JobApplicationFormValues) => {
    const jobApplication: JobApplicationPayload = {
      photo: null,
      fullName: data.fullName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      idType: undefined,
      idNumber: data.idNumber,
      idPicture: null,
      idExpirationDate: null,
      nationality: nationality,
      gender: selectedGender?.id,
      birthDate: birthDate ?? null,
      education: data.education,
      cityId: undefined,
      cv: cv,
      bio: data.bio,
      experiences: JSON.stringify([]),
    };

    if (validateData(jobApplication)) mutate(jobApplication);
  };

  useEffect(() => {
    if (response?.status == true) {
      navigate(`${APP_ROUTES.careers}/${jobId}/application/thanks`);
    } else if (response?.status == false && response.message) {
      toast(response.message);
    }
  }, [response?.status, response, navigate, jobId]);

  const validateData = (jobApplication: JobApplicationPayload): boolean => {
    let isValid = true;

    if (jobApplication.birthDate == null) {
      setBirthDateError(t("validations.birthDateRequired"));
      isValid = false;
    } else {
      setBirthDateError(null);
    }

    if (jobApplication.gender == null) {
      setGenderError(t("validations.genderRequired"));
      isValid = false;
    } else {
      setGenderError(null);
    }

    if (jobApplication.cv == null) {
      setCvError(t("validations.cvRequired"));
      isValid = false;
    } else {
      setCvError(null);
    }

    return isValid;
  };

  const headerTitle = location.state?.title
    ? isRTL
      ? location.state?.titleAr || location.state?.title
      : location.state?.title
    : t("job-application.title", { defaultValue: "Job Application" });
  return (
    <>
      <JobApplicationHero jobTitle={headerTitle} />

      <div className="py-16 container mx-auto mb-0 px-4 flex-mobile pb-mobile-fix">
        {/* Subtitle */}
        <div className="flex justify-center items-center ">
          <div className="">
            <span className="text-[#fd671a] text-md font-semibold">
              {t("job-application.subtitle", {
                defaultValue: isRTL ? "انضم إلى فريقنا" : "Join Our Team",
              })}
            </span>

            {/* Main Heading */}
            <h2 className="font-size-mobile-heading text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {t("job-application.title")}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start text-mobile-paragraph">
            {t("job-application.readDetailsMessage", {
              defaultValue: isRTL
                ? "قبل التقديم، يُرجى الاطلاع على تفاصيل الوظيفة للتأكد من أنها مناسبة لك."
                : "Before applying, please review the job details to ensure it is the right fit for you.",
            })}
          </p>
          <button
            onClick={() => setShowDetails(true)}
            className="h-12 px-8 rounded-md text-white font-semibold bg-gradient-to-r from-[#fd671a] to-[#C13899] hover:opacity-90"
          >
            {t("job-application.viewDetails", {
              defaultValue: isRTL ? "عرض تفاصيل الوظيفة" : "View Job Details",
            })}
          </button>
        </div>
      </div>
      <div className="job-application container px-4 pb-10 mx-auto w-full flex flex-col gap-6">
        <style>{`
          .form-input {
            background-color: #F7F8FB !important;
            color: #111827 !important;
            border: none !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            width: 100% !important;
            height: 50px !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }
          .form-input:focus {
            outline: none !important;
            border: 1px solid #8b5cf6 !important;
            box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
            background-color: white !important;
          }
          .form-input::placeholder {
            color: #6b7280 !important;
            font-size: 12px !important;
          }
          .form-select {
            background-color: #F7F8FB !important;
            color: #111827 !important;
            border: none !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            width: 100% !important;
            height: 50px !important;
            font-size: 14px !important;
            line-height: 20px !important;
          }
          .form-select:focus {
            outline: none !important;
            border: 1px solid #8b5cf6 !important;
            box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
            background-color: white !important;
          }
          .form-textarea {
            background-color: #F7F8FB !important;
            color: #111827 !important;
            border: none !important;
            border-radius: 4px !important;
            padding: 8px 12px !important;
            width: 100% !important;
            height: 80px !important;
            font-size: 14px !important;
            line-height: 20px !important;
            resize: none !important;
          }
          .form-textarea:focus {
            outline: none !important;
            border: 1px solid #8b5cf6 !important;
            box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2) !important;
            background-color: white !important;
          }
          .form-textarea::placeholder {
            color: #6b7280 !important;
            font-size: 12px !important;
          }
        `}</style>
        <div className="relative w-full mx-auto">
          <form
            method="POST"
            onSubmit={handleSubmit(submitForm)}
            className="flex flex-col w-full gap-3"
          >
            {/* Photo Upload Section */}
            <div className={`flex flex-col lg:flex-row gap-8 `}>
              {/* Left Side - Photo Upload */}
              <div className="lg:w-1/3">
                <div className="bg-[#F7F8FB] rounded-md p-6 h-80 flex flex-col items-center justify-center border-gray-300">
                  <div className="text-gray-400 text-6xl mb-4">↑</div>
                  <p className="text-gray-500 text-sm text-center">
                    {isRTL ? "صورة (خلفية بيضاء)" : "photo (white background)"}
                  </p>
                </div>
              </div>

              {/* Right Side - Personal Information */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Column */}
                  <div
                    className={`space-y-4 ${
                      isRTL ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "الاسم الأول" : "First Name"}
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        className="form-input"
                        placeholder={
                          isRTL ? "أدخل اسمك الأول" : "Enter your first name"
                        }
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "البريد الإلكتروني" : "E-mail"}
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="form-input"
                        placeholder={
                          isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"
                        }
                        dir="ltr"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "تاريخ الميلاد" : "Date Of Birth"}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          className="form-input"
                          value={
                            birthDate
                              ? birthDate.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            const date = e.target.value
                              ? new Date(e.target.value)
                              : null;
                            setBirthDate(date);
                          }}
                          dir="ltr"
                        />
                        <div
                          className={`absolute ${
                            isRTL ? "left-3" : "right-3"
                          } top-1/2 transform -translate-y-1/2 text-gray-400`}
                        >
                          📅
                        </div>
                      </div>
                      {birthDateError && (
                        <p className="text-red-500 text-sm mt-1">
                          {birthDateError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "وثيقة الهوية" : "ID Document"}
                      </label>
                      <div className="relative">
                        <select
                          className="form-select"
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <option value="SA">
                            {isRTL
                              ? "المملكة العربية السعودية"
                              : "Saudi Arabia"}
                          </option>
                          <option value="US">
                            {isRTL ? "الولايات المتحدة" : "United States"}
                          </option>
                          <option value="UK">
                            {isRTL ? "المملكة المتحدة" : "United Kingdom"}
                          </option>
                        </select>
                        <div
                          className={`absolute ${
                            isRTL ? "left-3" : "right-3"
                          } top-1/2 transform -translate-y-1/2 text-gray-400`}
                        >
                          ↑
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Column */}
                  <div
                    className={`space-y-4 ${
                      isRTL ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "اسم العائلة" : "Last Name"}
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={
                          isRTL ? "أدخل اسم العائلة" : "Enter your last name"
                        }
                        dir={isRTL ? "rtl" : "ltr"}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "رقم الجوال" : "Mobile Num"}
                      </label>
                      <input
                        type="tel"
                        {...register("mobileNumber")}
                        className="form-input"
                        placeholder={
                          isRTL ? "أدخل رقم الجوال" : "Enter your mobile number"
                        }
                        dir="ltr"
                      />
                      {errors.mobileNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.mobileNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "الجنس" : "Gender"}
                      </label>
                      <div className="relative">
                        <select
                          className="form-select"
                          onChange={(e) => {
                            const gender = {
                              id: parseInt(e.target.value),
                              name:
                                e.target.value === "1"
                                  ? isRTL
                                    ? "ذكر"
                                    : "Male"
                                  : isRTL
                                  ? "أنثى"
                                  : "Female",
                              title:
                                e.target.value === "1"
                                  ? isRTL
                                    ? "ذكر"
                                    : "Male"
                                  : isRTL
                                  ? "أنثى"
                                  : "Female",
                            };
                            setSelectedGender(gender);
                          }}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <option value="">
                            {isRTL ? "اختر الجنس" : "Select gender"}
                          </option>
                          <option value="1">{isRTL ? "ذكر" : "Male"}</option>
                          <option value="2">{isRTL ? "أنثى" : "Female"}</option>
                        </select>
                        <div
                          className={`absolute ${
                            isRTL ? "left-3" : "right-3"
                          } top-1/2 transform -translate-y-1/2 text-gray-400`}
                        >
                          ↑
                        </div>
                      </div>
                      {genderError && (
                        <p className="text-red-500 text-sm mt-1">
                          {genderError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">
                        {isRTL ? "الجنسية" : "Nationality"}
                      </label>
                      <div className="relative">
                        <select
                          className="form-select"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <option value="SA">
                            {isRTL
                              ? "المملكة العربية السعودية"
                              : "Saudi Arabia"}
                          </option>
                          <option value="US">
                            {isRTL ? "الولايات المتحدة" : "United States"}
                          </option>
                          <option value="UK">
                            {isRTL ? "المملكة المتحدة" : "United Kingdom"}
                          </option>
                        </select>
                        <div
                          className={`absolute ${
                            isRTL ? "left-3" : "right-3"
                          } top-1/2 transform -translate-y-1/2 text-gray-400`}
                        >
                          ↑
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side - Photo Upload */}
              <div className="lg:w-1/3"></div>

              {/* Right Side - Personal Information */}
              <div className="lg:w-2/3">
                {/* CV Upload Section */}
                <div className="w-full">
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    {isRTL ? "السيرة الذاتية" : "CV"}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setCv(file);
                      }}
                      className="form-input"
                      placeholder={
                        isRTL
                          ? "ارفع سيرتك الذاتية / PDF أو Word"
                          : "Upload Your CV / PDF Or Word"
                      }
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <div
                      className={`absolute ${
                        isRTL ? "left-3" : "right-3"
                      } top-1/2 transform -translate-y-1/2 text-gray-400`}
                    >
                      ↑
                    </div>
                  </div>
                  {cvError && (
                    <p className="text-red-500 text-sm mt-1">{cvError}</p>
                  )}
                </div>

                {/* Bio Section */}
                <div className="w-full">
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    {isRTL ? "نبذة شخصية" : "Bio"}
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    className="form-textarea"
                    placeholder={
                      isRTL
                        ? "اكتب وصفاً مختصراً عن نفسك"
                        : "Write a brief description about yourself"
                    }
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
                    disabled={isPending}
                  >
                    {isPending
                      ? isRTL
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : isRTL
                      ? "إرسال"
                      : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Job Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetails(false)}
          />
          <div className="relative bg-white rounded-md shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start gap-4 mb-6">
              <h2 className="font-bold md:text-2xl text-xl capitalize flex items-center gap-3">
                {headerTitle}
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">
                  {t("job.open", { defaultValue: isRTL ? "متاح" : "Open" })}
                </span>
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FiMapPin className="text-gray-500" />
                <span>{isRTL ? "الرياض" : "Riyadh"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FiCalendar className="text-gray-500" />
                <span>{isRTL ? "منذ سنة" : "a year ago"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FiClock className="text-gray-500" />
                <span>{isRTL ? "دوام جزئي" : "Part Time"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FiBriefcase className="text-gray-500" />
                <span>{isRTL ? "إدارة" : "Management"}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {isRTL ? "عن إيفنت ماسترز:" : "About Mukafaat:"}
                </h3>
                <ul className="list-disc ps-6 space-y-2 text-sm text-gray-800">
                  <li>
                    {isRTL
                      ? "إيفنت ماسترز هي شريكك الأول لجميع احتياجات إدارة الفعاليات في المملكة العربية السعودية"
                      : "Mukafaat is your premier partner for all your event management needs in Saudi Arabia"}
                  </li>
                  <li>
                    {isRTL
                      ? "نلتزم بتقديم حلول فعّالة وشاملة للفعاليات، ونحوّل رؤيتك إلى واقع بسهولة"
                      : "With a dedicated focus on providing comprehensive event solutions, we are committed to turning your vision into reality seamlessly"}
                  </li>
                  <li>
                    {isRTL
                      ? "سواءً كنت تخطط لفعالية شركات أو زفاف أو فعالية مجتمعية، ثق بنا لتقديم التميز في كل خطوة"
                      : "Whether you're planning a corporate gathering, a wedding, or a community event, trust Mukafaat to deliver excellence every step of the way"}
                  </li>
                </ul>
              </div>

              {/* <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {isRTL ? "وصف الوظيفة:" : "Job Description:"}
                </h3>
                <ul className="list-disc ps-6 space-y-2 text-sm text-gray-800">
                  <li>
                    {isRTL
                      ? "نبحث عن مشرفين ذوي خبرة لقيادة الفرق في الفعاليات الضخمة وإدارة فرق العمل وضمان سير العمليات بسلاسة"
                      : "Mukafaat is looking for experienced Supervisors to lead teams at MEGA events! Manage event staff and ensure operations run smoothly"}
                  </li>
                  <li className="whitespace-pre-line">
                    {isRTL
                      ? "المسؤوليات:\n- قيادة وإدارة فرق العمل\n- التنسيق مع فرق اللوجستيات والتقنية\n- حل التحديات في الموقع وضمان رضا الضيوف"
                      : "Responsibilities:\n- Lead and manage event staff\n- Coordinate with logistics and technical teams\n- Solve on-site challenges and ensure guest satisfaction"}
                  </li>
                </ul>
              </div> */}

              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {isRTL ? "متطلبات الوظيفة:" : "Job Requirements:"}
                </h3>
                <ul className="list-disc ps-6 space-y-2 text-sm text-gray-800">
                  <li
                    className="whitespace-pre-line"
                    style={{ lineHeight: "24px" }}
                  >
                    {isRTL
                      ? "المتطلبات:\n- سعودي الجنسية\n- خبرة مثبتة في القيادة وإدارة الفعاليات\n- مهارات قوية في حل المشكلات والتنظيم\n- خبرة في إدارة الفرق والميزانيات والعمليات\n- المرونة في العمل بساعات غير منتظمة بما في ذلك المساء\n- القدرة على العمل تحت الضغط\n- كن القوة الدافعة وراء نجاح الفعاليات الكبرى!"
                      : "Requirements:\n- Saudi national\n- Proven leadership and event management experience\n- Strong problem-solving and organizational skills\n- Experience in staffing, budgeting, and operations management\n- Flexibility to work irregular hours, including evenings\n- Ability to handle high-pressure environments\n- Be the driving force behind the success of high-profile events!"}
                  </li>
                </ul>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 text-sm rounded-md bg-gradient-to-r from-[#fd671a] to-[#C13899] text-white font-semibold"
                >
                  {t("job-application.apply", {
                    defaultValue: isRTL
                      ? "التقديم على الوظيفة"
                      : "Apply for this job",
                  })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <GetStarted />
    </>
  );
};

export default JobApplication;
