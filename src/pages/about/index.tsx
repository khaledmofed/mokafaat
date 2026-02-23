import // AboutVideo,
// CoreValues,
// Features,
// OurStaff,
// VissionMission,
"./components/index";
import { useIsRTL } from "@hooks";
import {
  FAQSection,
  GetStartedSection,
  // GetStarted,
} from "@pages/home/components";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import AboutComponent from "@pages/home/components/AboutComponent";

const AboutPage = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  // const location = useLocation();
  // Get About Us data only in this page
  const { data: getAboutResponse, isSuccess: isAboutSuccess } = useGetQuery({
    endpoint: API_ENDPOINTS.getAboutUs,
  });

  // Console log to see the response structure
  console.log("About Us API Response:", getAboutResponse);
  console.log("About Us Data:", getAboutResponse?.data?.aboutUs);
  console.log("About Us Success:", isAboutSuccess);

  // const aboutUs = getAboutResponse?.data?.aboutUs || null;

  // const ourVission =
  //   isRTL && aboutUs?.arOurVision ? aboutUs.arOurVision : aboutUs?.enOurVision;

  // const ourMission =
  //   isRTL && aboutUs?.arOurMission
  //     ? aboutUs.arOurMission
  //     : aboutUs?.enOurMission;

  // const ourTeam =
  //   isRtl && aboutUs?.arOurTeam ? aboutUs.arOurTeam : aboutUs?.enOurTeam;

  return (
    <>
      <Helmet>
        <title>{t("home.navbar.about")}</title>
        <link rel="canonical" href="https://mukafaat.com/about" />
        <meta
          name="description"
          content="Learn more about our mission, values, and the team behind Mukafaat."
        />
        <meta property="og:title" content={t("home.navbar.about")} />
        <meta
          property="og:description"
          content="Learn more about our mission, values, and the team behind Mukafaat."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        {/* Listing Header */}
        <div className="bg-white pb-6">
          <div className="container mx-auto px-4 lg:px-0 py-0">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-[#141414] font-medium mb-4 pt-4">
              <HiOutlineHome className="me-2 text-lg" />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/")}
              >
                {isRTL ? "الرئيسية" : "Home"}
              </span>
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/about")}
              >
                {isRTL ? "من نحن" : t("about.hero.title")}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <h1
                  className="text-[#400198] text-3xl font-bold"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "من نحن - مكافئات" : "About Mukafaat"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isRTL
                    ? "اكتشف منصة مكافئات الرائدة في المملكة العربية السعودية لتوفير المال والاستفادة من أفضل العروض والخصومات على البطاقات الائتمانية والكوبونز والحجوزات."
                    : "Discover Mukafaat, the leading platform in Saudi Arabia for saving money and benefiting from the best offers and discounts on credit cards, coupons, and bookings."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <AboutComponent />
        <GetStartedSection className="mt-0 mb-0" /> <FAQSection />
        {/* <AboutVideo
          arDescription={aboutUs?.arDescription}
          enDescription={aboutUs?.enDescription}
        />
        <CoreValues />
        <VissionMission
          vissionDescription={ourVission}
          missionDescription={ourMission}
        />
        <GetStarted /> */}
      </div>
    </>
  );
};

export default AboutPage;
