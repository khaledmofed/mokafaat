// import { useMemo, useState } from "react";
// import { FiMapPin, FiCalendar } from "react-icons/fi";
import { t } from "i18next";
// import GetStarted from "@/pages/home/components/GetStarted";
import { Link } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { GetStarted } from "@pages/home/components";
import { AboutPattern } from "@assets";

const JobsHero = () => {
  //   const isRTL = useIsRTL();
  const titleFontType = useIsRTL()
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";

  return (
    <>
      <section className="relative w-full bg-[#1D0843]  overflow-hidden min-h-[100px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30"></div>
        <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
          <h1
            className={`${titleFontType} mb-4 tracking-tight leading-none text-white wow fadeInUp`}
            data-wow-delay="0.2s"
          >
            {t("careers.title", { defaultValue: "Events Masters Jobs" })}
          </h1>

          <div
            className="flex items-center justify-center space-x-2 text-sm md:text-base wow fadeInUp"
            data-wow-delay="0.3s"
          >
            <Link to="/" className="text-white hover:text-purple-300 text-xs">
              {t("home.navbar.home")}
            </Link>
            <span className="text-white text-xs">|</span>
            <span className="text-purple-300 font-medium text-xs">
              {t("careers.title", { defaultValue: "Jobs" })}
            </span>
          </div>
        </div>
        <div className={`absolute -bottom-10  transform z-9`}>
          <img
            src={AboutPattern}
            alt="App Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>
    </>
  );
};

// type JobItem = {
//   id: number;
//   title: string;
//   titleAr?: string;
//   country: string;
//   countryAr?: string;
//   type: string; // Part Time / Full Time
//   date: string; // 09 July 2025
//   status: "open" | "end";
// };

// const jobsData: JobItem[] = [
//   {
//     id: 1,
//     title: "Supervisors (Saudi Nationals Only)",
//     titleAr: "مشرفون (سعوديون فقط)",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "09 July 2025",
//     status: "open",
//   },
//   {
//     id: 2,
//     title: "Supervisors (Saudi Nationals Only)",
//     titleAr: "مشرفون (سعوديون فقط)",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "09 July 2025",
//     status: "end",
//   },
//   {
//     id: 3,
//     title: "Supervisors (Saudi Nationals Only)",
//     titleAr: "مشرفون (سعوديون فقط)",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "09 July 2025",
//     status: "open",
//   },
//   {
//     id: 4,
//     title: "Supervisors (Saudi Nationals Only)",
//     titleAr: "مشرفون (سعوديون فقط)",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "09 July 2025",
//     status: "open",
//   },
//   {
//     id: 5,
//     title: "Event Ushers",
//     titleAr: "مرشدو فعاليات",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Full Time",
//     date: "11 July 2025",
//     status: "open",
//   },
//   {
//     id: 6,
//     title: "Ticketing Staff",
//     titleAr: "طاقم التذاكر",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "12 July 2025",
//     status: "open",
//   },
//   {
//     id: 7,
//     title: "Logistics Assistant",
//     titleAr: "مساعد لوجستي",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "13 July 2025",
//     status: "end",
//   },
//   {
//     id: 8,
//     title: "Stage Coordinator",
//     titleAr: "منسق منصة",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Full Time",
//     date: "14 July 2025",
//     status: "open",
//   },
//   {
//     id: 9,
//     title: "Security Officer",
//     titleAr: "مسؤول أمن",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "15 July 2025",
//     status: "open",
//   },
//   {
//     id: 10,
//     title: "Registration Desk",
//     titleAr: "مكتب التسجيل",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "16 July 2025",
//     status: "open",
//   },
//   {
//     id: 11,
//     title: "Crowd Control",
//     titleAr: "تنظيم الحشود",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Full Time",
//     date: "17 July 2025",
//     status: "open",
//   },
//   {
//     id: 12,
//     title: "Audio Technician",
//     titleAr: "فني صوت",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "18 July 2025",
//     status: "end",
//   },
//   {
//     id: 13,
//     title: "Catering Assistant",
//     titleAr: "مساعد ضيافة",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "19 July 2025",
//     status: "open",
//   },
//   {
//     id: 14,
//     title: "Cleaning Crew",
//     titleAr: "فريق تنظيف",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "20 July 2025",
//     status: "open",
//   },
//   {
//     id: 15,
//     title: "Drivers",
//     titleAr: "سائقون",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Full Time",
//     date: "21 July 2025",
//     status: "open",
//   },
//   {
//     id: 16,
//     title: "Photographer",
//     titleAr: "مصور",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "22 July 2025",
//     status: "open",
//   },
//   {
//     id: 17,
//     title: "Videographer",
//     titleAr: "مصوّر فيديو",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "23 July 2025",
//     status: "open",
//   },
//   {
//     id: 18,
//     title: "Host/Hostess",
//     titleAr: "مضيف/مضيفة",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "24 July 2025",
//     status: "open",
//   },
//   {
//     id: 19,
//     title: "Lighting Technician",
//     titleAr: "فني إضاءة",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Full Time",
//     date: "25 July 2025",
//     status: "end",
//   },
//   {
//     id: 20,
//     title: "Backstage Runner",
//     titleAr: "منسق خلف الكواليس",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "26 July 2025",
//     status: "open",
//   },
//   {
//     id: 21,
//     title: "Booth Attendant",
//     titleAr: "موظف جناح",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Full Time",
//     date: "27 July 2025",
//     status: "open",
//   },
//   {
//     id: 22,
//     title: "Merchandise Seller",
//     titleAr: "بائع منتجات",
//     country: "Morocco",
//     countryAr: "المغرب",
//     type: "Part Time",
//     date: "28 July 2025",
//     status: "open",
//   },
//   {
//     id: 23,
//     title: "Queue Manager",
//     titleAr: "منسق طوابير",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "29 July 2025",
//     status: "open",
//   },
//   {
//     id: 24,
//     title: "Runner",
//     titleAr: "مساعد متحرك",
//     country: "Saudi Arabia",
//     countryAr: "المملكة العربية السعودية",
//     type: "Part Time",
//     date: "30 July 2025",
//     status: "open",
//   },
// ];

const JobsPage = () => {
  const isRTL = useIsRTL();
  // const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1);
  // Search filters (pending → applied on Search click)
  // const allOption = "All";
  // const countries = Array.from(new Set(jobsData.map((j) => j.country)));
  // const types = Array.from(new Set(jobsData.map((j) => j.type)));
  // const [pendingCountry, setPendingCountry] = useState<string>(allOption);
  // const [pendingType, setPendingType] = useState<string>(allOption);
  // const [appliedCountry, setAppliedCountry] = useState<string>(allOption);
  // const [appliedType, setAppliedType] = useState<string>(allOption);
  // const perPage = 8;
  // const filtered = useMemo(() => {
  //   return jobsData.filter((j) => {
  //     const matchCountry =
  //       appliedCountry === allOption || j.country === appliedCountry;
  //     const matchType = appliedType === allOption || j.type === appliedType;
  //     return matchCountry && matchType;
  //   });
  // }, [appliedCountry, appliedType]);

  // const totalPages = Math.ceil(filtered.length / perPage) || 1;
  // const paginated = useMemo(
  //   () => filtered.slice((currentPage - 1) * perPage, currentPage * perPage),
  //   [filtered, currentPage]
  // );

  // const applySearch = () => {
  //   setAppliedCountry(pendingCountry);
  //   setAppliedType(pendingType);
  //   setCurrentPage(1);
  // };

  return (
    <>
      <JobsHero />
      <section className="container mx-auto md:p-10 p-6">
        <div className="relative w-full  mx-auto">
          <div className="text-center py-20 px-6">
            <div className="max-w-md mx-auto">
              {/* Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#fd671a]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isRTL ? "لا توجد وظائف متاحة حالياً" : "No Jobs Available"}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">
                {isRTL
                  ? "نعتذر، لا توجد وظائف متاحة في الوقت الحالي. يرجى التحقق من هذه الصفحة لاحقاً أو التواصل معنا للحصول على معلومات حول الفرص المستقبلية."
                  : "We're sorry, there are no job opportunities available at the moment. Please check back later or contact us for information about future opportunities."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-[#fd671a] to-[#C13899] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {isRTL ? "إعادة تحميل" : "Refresh"}
                </button>

                <Link
                  to="/contact"
                  className="px-6 py-3 border-2 border-purple-600 text-[#fd671a] font-semibold rounded-md hover:bg-[#fd671a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {isRTL ? "تواصل معنا" : "Contact Us"}
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <p className="text-sm text-purple-700">
                  {isRTL
                    ? "💡 نصيحة: يمكنك أيضاً متابعة صفحتنا على LinkedIn للحصول على آخر التحديثات حول الوظائف المتاحة."
                    : "💡 Tip: You can also follow our LinkedIn page for the latest updates on available job opportunities."}
                </p>
              </div>
            </div>
          </div>
          {/* Filter Bar */}
          {/* <div className="flex items-center gap-6 mb-8">
            <div className="relative flex-1">
              <select
                value={pendingCountry}
                onChange={(e) => setPendingCountry(e.target.value)}
                className="w-full h-12 bg-gray-100 rounded-md pl-5 pr-10 text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value={allOption}>
                  {t("company-application.country", {
                    defaultValue: "Country",
                  })}
                </option>
                <option value={allOption}>
                  {t("portfolio.tabs.all", { defaultValue: "All" })}
                </option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {isRTL
                      ? c === "Saudi Arabia"
                        ? "المملكة العربية السعودية"
                        : c === "Morocco"
                        ? "المغرب"
                        : c
                      : c}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </div>

            <div className="relative flex-1">
              <select
                value={pendingType}
                onChange={(e) => setPendingType(e.target.value)}
                className="w-full h-12 bg-gray-100 rounded-md pl-5 pr-10 text-gray-600 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value={allOption}>
                  {t("careers.workType", { defaultValue: "Work Type" })}
                </option>
                <option value={allOption}>
                  {t("portfolio.tabs.all", { defaultValue: "All" })}
                </option>
                {types.map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
              </svg>
            </div>

            <button
              onClick={applySearch}
              className="h-12 px-8 rounded-md text-white font-semibold bg-gradient-to-r from-[#fd671a] to-[#C13899] hover:opacity-90"
            >
              {t("careers.search", { defaultValue: "Search" })}
            </button>
          </div> */}

          {/* {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginated.map((job) => (
              <div
                key={job.id}
                className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <span
                    className={`inline-block px-4 py-2 rounded-md text-sm font-semibold ${
                      job.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {job.status === "open"
                      ? t("job.open", { defaultValue: "Open" })
                      : t("job.close", { defaultValue: "end" })}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mt-4">
                  {isRTL ? job.titleAr || job.title : job.title}
                </h3>
                <p className="text-md text-gray-500 mt-4">
                  {t("careers.header-description", {
                    defaultValue:
                      "Join Mukafaat as part of the Logistics team and help manage the setup and teardown of major events",
                  })}
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-800 text-sm">
                    <FiMapPin />{" "}
                    {isRTL ? job.countryAr || job.country : job.country}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-800 text-sm">
                    <span className="font-medium">{job.type}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCalendar className="text-[#fd671a]" />
                    <span className="text-sm">{job.date}</span>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/jop/${job.id}/application`, {
                        state: { title: job.title, titleAr: job.titleAr },
                      })
                    }
                    className="px-6 py-3 rounded-md bg-[#fd671a] text-white hover:bg-purple-700 text-sm font-semibold"
                  >
                    {t("careers.ad.apply", { defaultValue: "Apply Now" })}
                  </button>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-20 px-6">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-[#fd671a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {isRTL ? "لا توجد وظائف متاحة حالياً" : "No Jobs Available"}
                </h3>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {isRTL
                    ? "نعتذر، لا توجد وظائف متاحة في الوقت الحالي. يرجى التحقق من هذه الصفحة لاحقاً أو التواصل معنا للحصول على معلومات حول الفرص المستقبلية."
                    : "We're sorry, there are no job opportunities available at the moment. Please check back later or contact us for information about future opportunities."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-[#fd671a] to-[#C13899] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    {isRTL ? "إعادة تحميل" : "Refresh"}
                  </button>

                  <Link
                    to="/contact"
                    className="px-6 py-3 border-2 border-purple-600 text-[#fd671a] font-semibold rounded-md hover:bg-[#fd671a] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {isRTL ? "تواصل معنا" : "Contact Us"}
                  </Link>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <p className="text-sm text-purple-700">
                    {isRTL
                      ? "💡 نصيحة: يمكنك أيضاً متابعة صفحتنا على LinkedIn للحصول على آخر التحديثات حول الوظائف المتاحة."
                      : "💡 Tip: You can also follow our LinkedIn page for the latest updates on available job opportunities."}
                  </p>
                </div>
              </div>
            </div>
          )} */}

          {/* {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-md text-sm ${
                      isActive
                        ? "bg-[#C13899] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )} */}
        </div>
      </section>
      <GetStarted />
    </>
  );
};

export default JobsPage;
