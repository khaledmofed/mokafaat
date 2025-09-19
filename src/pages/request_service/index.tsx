import { t } from "i18next";
// import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AboutPattern,
  // PeopleIcon,
  // BriefcaseIcon,
  // MouseSquareIcon,
  // SliderIcon,
  // CubeIcon,
  // MoroccoFlag,
  // SaudiRoundFlag,
  // EmiratesFlag,
  // OmanFlag,
} from "@assets";
import { useIsRTL } from "@hooks";
import { GetStarted } from "@pages/home/components";
// import BusinessRegistrationNavbar from "@business-registration/components/Navbar";
import BusinessRegistrationPage from "@business-registration";

const RequestServiceHero = () => {
  const isRTL = useIsRTL();
  const titleFontType = isRTL
    ? " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl"
    : " font-semibold mt-8 text-2xl md:text-2xl lg:text-2xl";
  return (
    <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[100px] flex items-center justify-center">
      <div className="absolute inset-0 bg-primary opacity-30" />
      <div className="relative pt-20 pb-16 px-6 mx-auto max-w-screen-xl text-center lg:pt-20 lg:pb-16 lg:px-12 flex flex-col justify-center z-10">
        <h1
          className={`${titleFontType} mb-4 tracking-tight leading-none text-white`}
        >
          {t("request-service.title", { defaultValue: "Request Our Service" })}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-xs">
          <Link to="/" className="text-white hover:text-purple-300">
            {t("home.navbar.home")}
          </Link>
          <span className="text-white">|</span>
          <span className="text-purple-300">
            {t("request-service.title", { defaultValue: "Request Service" })}
          </span>
        </div>
      </div>
      <div className="absolute -bottom-10 transform z-9">
        <img
          src={AboutPattern}
          alt="Pattern"
          className="w-full h-96 animate-float"
        />
      </div>
    </section>
  );
};

// type StepKey = 1 | 2 | 3 | 4 | 5;

// const SideSteps = ({ step }: { step: StepKey }) => {
//   const steps = [
//     t("request-service.steps.personal", { defaultValue: "Personal Info" }),
//     t("request-service.steps.company", { defaultValue: "Company Details" }),
//     t("request-service.steps.services", { defaultValue: "Services" }),
//     t("request-service.steps.regions", { defaultValue: "OperationalRegions" }),
//     t("request-service.steps.review", { defaultValue: "Review & submit" }),
//   ];
//   return (
//     <aside className="sticky top-24 self-start w-full max-w-[320px] py-20">
//       <ul className="space-y-6">
//         {steps.map((label, idx) => {
//           const current = (idx + 1) as StepKey;
//           const isDone = current < step;
//           const isActive = current === step;
//           return (
//             <li key={idx} className="flex items-center gap-3">
//               <span
//                 className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
//                   isActive
//                     ? "bg-[#fd671a] text-white"
//                     : isDone
//                     ? "bg-[#69aa3a] text-white"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 {idx + 1}
//               </span>
//               <span
//                 className={`${
//                   isActive ? "text-gray-900 font-semibold" : "text-gray-500"
//                 }`}
//               >
//                 {label}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// };

// type RequestForm = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
//   companyName: string;
//   crNumber: string;
//   vat: string;
//   website: string;
//   service: string;
//   region: string;
// };
// type SetForm = React.Dispatch<React.SetStateAction<RequestForm>>;

// const StepOne = ({
//   onNext,
//   setFormData,
// }: {
//   onNext: () => void;
//   setFormData: SetForm;
// }) => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           {t("request-service.step1.title", {
//             defaultValue: "Complete Your Personal Information",
//           })}
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           {t("request-service.required-note", {
//             defaultValue: "It means that the fields are required.",
//           })}
//         </p>
//       </div>
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.firstName", { defaultValue: "First Name" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, firstName: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.lastName", { defaultValue: "Last Name" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, lastName: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.email", { defaultValue: "E-mail" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, email: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.mobile", { defaultValue: "Mobile Num" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, mobile: e.target.value }))
//             }
//           />
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <button
//           onClick={onNext}
//           className="px-8 h-12 rounded-md text-white bg-[#fd671a]"
//         >
//           {t("common.next", { defaultValue: "Next" })}
//         </button>
//       </div>
//     </div>
//   );
// };

// const StepTwo = ({
//   onNext,
//   onBack,
//   setFormData,
// }: {
//   onNext: () => void;
//   onBack: () => void;
//   setFormData: SetForm;
// }) => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           {t("request-service.step2.title", {
//             defaultValue: "Your Company Information",
//           })}
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           {t("request-service.required-note", {
//             defaultValue: "It means that the fields are required.",
//           })}
//         </p>
//       </div>
//       <div className="grid md:grid-cols-2 gap-6">
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.companyName", { defaultValue: "Company Name" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, companyName: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.crNumber", { defaultValue: "CR Number" })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, crNumber: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.vat", {
//               defaultValue: "VAT Registration Number",
//             })}
//             <span className="text-[#C13899]">*</span>
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, vat: e.target.value }))
//             }
//           />
//         </div>
//         <div>
//           <label className="text-sm font-semibold text-gray-600 flex items-center gap-1">
//             {t("request-service.website", {
//               defaultValue: "Company Website ( optional )",
//             })}
//           </label>
//           <input
//             className="mt-2 h-12 rounded-md border border-gray-200 bg-gray-50 px-4 w-full"
//             onChange={(e) =>
//               setFormData((d) => ({ ...d, website: e.target.value }))
//             }
//           />
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 h-12 rounded-md bg-gray-100 text-gray-800"
//         >
//           {t("common.back", { defaultValue: "Back" })}
//         </button>
//         <button
//           onClick={onNext}
//           className="px-8 h-12 rounded-md text-white bg-[#fd671a]"
//         >
//           {t("common.next", { defaultValue: "Next" })}
//         </button>
//       </div>
//     </div>
//   );
// };

// const StepThree = ({
//   onNext,
//   onBack,
//   formData,
//   setFormData,
// }: {
//   onNext: () => void;
//   onBack: () => void;
//   formData: Record<string, string>;
//   setFormData: SetForm;
// }) => {
//   const cards = [
//     { key: "freelancer", title: "Freelancer", icon: PeopleIcon },
//     { key: "event", title: "Event Management", icon: BriefcaseIcon },
//     { key: "system", title: "Event System Solution", icon: SliderIcon },
//     { key: "promotion", title: "Promotion", icon: MouseSquareIcon },
//     { key: "equipment", title: "Equipment Renting", icon: CubeIcon },
//     { key: "logistic", title: "Logistic Solution", icon: CubeIcon },
//   ] as const;
//   const [selected, setSelected] = useState<string[]>(
//     formData.service ? [formData.service] : []
//   );
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           {t("request-service.step3.title", {
//             defaultValue: "What services you are interested in?",
//           })}
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           {t("request-service.multi", {
//             defaultValue: "You can choose multi select option",
//           })}
//         </p>
//       </div>
//       <div className="grid md:grid-cols-3 gap-7">
//         {cards.map((c) => {
//           const isActive = selected.includes(c.key);
//           return (
//             <button
//               type="button"
//               key={c.key}
//               onClick={() => {
//                 if (isActive) {
//                   // إزالة الخدمة من القائمة
//                   const newSelected = selected.filter((key) => key !== c.key);
//                   setSelected(newSelected);
//                   setFormData((d) => ({
//                     ...d,
//                     service: newSelected.join(", "),
//                   }));
//                 } else {
//                   // إضافة الخدمة إلى القائمة
//                   const newSelected = [...selected, c.key];
//                   setSelected(newSelected);
//                   setFormData((d) => ({
//                     ...d,
//                     service: newSelected.join(", "),
//                   }));
//                 }
//               }}
//               className={`group rounded-lg relative p-10 text-left bg-[#F7F8FB] border transition-all ${
//                 isActive
//                   ? "border-purple-600 shadow-md"
//                   : "border-gray-200 hover:border-purple-300"
//               }`}
//             >
//               <div className="flex items-center justify-between mb-16">
//                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                   <img src={c.icon} alt={c.title} className="w-10 h-10" />
//                 </div>
//                 <span
//                   className={`w-5 h-5 rounded-full icon-check ${
//                     isActive ? "bg-[#5AB307]" : "bg-gray-200"
//                   }`}
//                 />
//               </div>
//               <div className="mt-6 text-gray-900 font-semibold text-lg leading-snug">
//                 {t(`services.${c.title}`, { defaultValue: c.title })}
//               </div>
//             </button>
//           );
//         })}
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 h-12 rounded-md bg-gray-100 text-gray-800"
//         >
//           {t("common.back", { defaultValue: "Back" })}
//         </button>
//         <button
//           onClick={onNext}
//           className="px-8 h-12 rounded-md text-white bg-[#fd671a]"
//         >
//           {t("common.next", { defaultValue: "Next" })}
//         </button>
//       </div>
//     </div>
//   );
// };

// const StepFour = ({
//   onNext,
//   onBack,
//   formData,
//   setFormData,
// }: {
//   onNext: () => void;
//   onBack: () => void;
//   formData: Record<string, string>;
//   setFormData: SetForm;
// }) => {
//   const countries = [
//     { key: "sa", title: "Saudi Arabia", img: SaudiRoundFlag },
//     { key: "ae", title: "United Arab Emirates", img: EmiratesFlag },
//     { key: "om", title: "Sultanate of Oman", img: OmanFlag },
//     { key: "ma", title: "Morocco", img: MoroccoFlag },
//   ];
//   const [selectedCountries, setSelectedCountries] = useState<string[]>(
//     formData.region ? [formData.region] : []
//   );
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           {t("request-service.step4.title", {
//             defaultValue:
//               "Select the countries or regions where your company plans to work",
//           })}
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           {t("request-service.multi", {
//             defaultValue: "You can choose multi select option",
//           })}
//         </p>
//       </div>
//       <div className="grid md:grid-cols-3 gap-7">
//         {countries.map((c) => {
//           const isActive = selectedCountries.includes(c.key);
//           return (
//             <button
//               type="button"
//               key={c.key}
//               onClick={() => {
//                 if (isActive) {
//                   // إزالة المنطقة من القائمة
//                   const newSelected = selectedCountries.filter(
//                     (key) => key !== c.key
//                   );
//                   setSelectedCountries(newSelected);
//                   setFormData((d) => ({
//                     ...d,
//                     region: newSelected.join(", "),
//                   }));
//                 } else {
//                   // إضافة المنطقة إلى القائمة
//                   const newSelected = [...selectedCountries, c.key];
//                   setSelectedCountries(newSelected);
//                   setFormData((d) => ({
//                     ...d,
//                     region: newSelected.join(", "),
//                   }));
//                 }
//               }}
//               className={`group rounded-lg relative p-10 text-left bg-[#F7F8FB] border transition-all ${
//                 isActive
//                   ? "border-purple-600 shadow-md"
//                   : "border-gray-200 hover:border-purple-300"
//               }`}
//             >
//               <div className="flex items-center justify-between mb-16">
//                 <img
//                   src={c.img}
//                   alt={c.title}
//                   className="w-16 h-16 rounded-full"
//                 />
//                 <span
//                   className={`w-5 h-5 rounded-full icon-check ${
//                     isActive ? "bg-[#5AB307]" : "bg-gray-200"
//                   }`}
//                 />
//               </div>
//               <div className="mt-6 text-gray-900 font-semibold text-lg leading-snug">
//                 {t(`countries.${c.title}`, { defaultValue: c.title })}
//               </div>
//             </button>
//           );
//         })}
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 h-12 rounded-md bg-gray-100 text-gray-800"
//         >
//           {t("common.back", { defaultValue: "Back" })}
//         </button>
//         <button
//           onClick={onNext}
//           className="px-8 h-12 rounded-md text-white bg-[#fd671a]"
//         >
//           {t("common.next", { defaultValue: "Next" })}
//         </button>
//       </div>
//     </div>
//   );
// };

// const StepFive = ({
//   onBack,
//   data,
// }: {
//   onBack: () => void;
//   data: Record<string, string>;
// }) => {
//   const serviceLabel = (serviceText: string) => {
//     // تقسيم النص المدمج إلى مفاتيح منفصلة
//     const keys = serviceText.split(", ").map((key) => key.trim());

//     const map: Record<string, string> = {
//       freelancer: t("services.Freelancer", { defaultValue: "Freelancer" }),
//       event: t("services.Event Management", {
//         defaultValue: "Event Management",
//       }),
//       system: t("services.Event System Solution", {
//         defaultValue: "Event System Solution",
//       }),
//       promotion: t("services.Promotion", { defaultValue: "Promotion" }),
//       equipment: t("services.Equipment Renting", {
//         defaultValue: "Equipment Renting",
//       }),
//       logistic: t("services.Logistic Solution", {
//         defaultValue: "Logistic Solution",
//       }),
//     };

//     // تحويل كل مفتاح إلى اسم الخدمة الكامل
//     const serviceNames = keys.map((key) => map[key] || key);

//     // إرجاع مصفوفة من أسماء الخدمات
//     return serviceNames;
//   };

//   const regionLabel = (regionText: string) => {
//     // تقسيم النص المدمج إلى مفاتيح منفصلة
//     const keys = regionText.split(", ").map((key) => key.trim());

//     const map: Record<string, string> = {
//       sa: t("countries.Saudi Arabia", { defaultValue: "Saudi Arabia" }),
//       ae: t("countries.United Arab Emirates", {
//         defaultValue: "United Arab Emirates",
//       }),
//       om: t("countries.Sultanate of Oman", {
//         defaultValue: "Sultanate of Oman",
//       }),
//       ma: t("countries.Morocco", { defaultValue: "Morocco" }),
//     };

//     // تحويل كل مفتاح إلى اسم الدولة الكامل
//     const countryNames = keys.map((key) => map[key] || key);

//     // إرجاع مصفوفة من أسماء الدول
//     return countryNames;
//   };
//   return (
//     <div className="space-y-8">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">
//           {t("request-service.step5.title", {
//             defaultValue: "One step to finish",
//           })}
//         </h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           {t("request-service.step5.note", {
//             defaultValue: "Please review and verify the data.",
//           })}
//         </p>
//       </div>
//       <div className="rounded-md border border-gray-200 p-6 text-sm text-gray-800 space-y-4">
//         <div className="font-semibold text-gray-600">
//           {t("request-service.review.personal", {
//             defaultValue: "Personal Information",
//           })}
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.firstName", { defaultValue: "First Name" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.firstName || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.lastName", { defaultValue: "Last Name" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.lastName || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.email", { defaultValue: "E-mail" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.email || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.mobile", { defaultValue: "Mobile Num" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.mobile || "-"}</span>
//           </div>
//         </div>
//         <hr />
//         <div className="font-semibold text-gray-600">
//           {t("request-service.review.company", {
//             defaultValue: "Company Information",
//           })}
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.companyName", {
//                 defaultValue: "Company Name",
//               })}
//               :
//             </span>{" "}
//             <span className="font-semibold">{data.companyName || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.crNumber", { defaultValue: "CR Number" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.crNumber || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.vat", {
//                 defaultValue: "VAT Registration Number",
//               })}
//               :
//             </span>{" "}
//             <span className="font-semibold">{data.vat || "-"}</span>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.website", { defaultValue: "Website Link" })}:
//             </span>{" "}
//             <span className="font-semibold">{data.website || "-"}</span>
//           </div>
//         </div>
//         <hr />
//         <div className="font-semibold text-gray-600">
//           {t("request-service.review.selection", {
//             defaultValue: "Selections",
//           })}
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.selectedService", {
//                 defaultValue: "Service",
//               })}
//               :
//             </span>{" "}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {serviceLabel(data.service).map((service, index) => (
//                 <span
//                   key={index}
//                   className="font-semibold bg-[#F7F8FB] rounded-md px-3 py-2 text-sm"
//                 >
//                   {service}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div>
//             <span className="text-gray-500">
//               {t("request-service.selectedRegion", { defaultValue: "Region" })}:
//             </span>{" "}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {regionLabel(data.region).map((country, index) => (
//                 <span
//                   key={index}
//                   className="font-semibold bg-[#F7F8FB] rounded-md px-3 py-2 text-sm"
//                 >
//                   {country}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 h-12 rounded-md bg-gray-100 text-gray-800"
//         >
//           {t("common.back", { defaultValue: "Back" })}
//         </button>
//         <button className="px-8 h-12 rounded-md text-white bg-[#fd671a]">
//           {t("common.next", { defaultValue: "Next" })}
//         </button>
//       </div>
//     </div>
//   );
// };

const RequestServicePage = () => {
  // const [step, setStep] = useState<StepKey>(1);
  // const [formData, setFormData] = useState<RequestForm>({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   mobile: "",
  //   companyName: "",
  //   crNumber: "",
  //   vat: "",
  //   website: "",
  //   service: "freelancer",
  //   region: "sa",
  // });
  return (
    <>
      <RequestServiceHero />
      <BusinessRegistrationPage />
      {/* <section className="container mx-auto px-4 md:px-4 min-h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10">
          <SideSteps step={step} />
          <div className="md:border-s md:ps-24 py-20 min-h-[70vh]">
            {step === 1 && (
              <StepOne onNext={() => setStep(2)} setFormData={setFormData} />
            )}
            {step === 2 && (
              <StepTwo
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <StepThree
                onBack={() => setStep(2)}
                onNext={() => setStep(4)}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 4 && (
              <StepFour
                onBack={() => setStep(3)}
                onNext={() => setStep(5)}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 5 && (
              <StepFive onBack={() => setStep(4)} data={formData} />
            )}
          </div>
        </div>
      </section> */}
      <GetStarted />
    </>
  );
};

export default RequestServicePage;
