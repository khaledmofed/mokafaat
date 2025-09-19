import { useEffect } from "react";
import WOW from "wow.js";
import { Outlet } from "react-router-dom";

import {
  Footer,
  Navbar,
  ScrollToTop,
  ScrollToTopButton,
  // TopNav,
  // Splash,
  GlobalStyles,
} from "@components";
// import { useWebsiteProvider } from "@hooks";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "animate.css";
import "wow.js/css/libs/animate.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

const Layout = () => {
  // const { isLoading } = useWebsiteProvider();

  useEffect(() => {
    new WOW().init();
  }, []);

  // LanguageContext already handles document attributes, so we don't need this
  // useEffect(() => {
  //   document.documentElement.lang = currentLanguage;
  //   document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  // }, [currentLanguage]);

  return (
    <>
      {/* {isLoading ? (
        <Splash />
      ) : ( */}
      <div className="content relative min-h-screen">
        <GlobalStyles />
        {/* <TopNav /> */}
        <Navbar />
        <ScrollToTop />
        <Outlet />
        <ScrollToTopButton />
        <Footer />
        <ToastContainer />
      </div>
      {/* )}   */}
    </>
  );
};

export default Layout;
