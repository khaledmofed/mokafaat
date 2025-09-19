import { useIsRTL } from "@hooks";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const isRTL = useIsRTL();
  const dirction = isRTL ? "left-10" : "right-10";

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={handleClick}
        className={`fixed z-20 p-4 bottom-10 ${dirction} bg-gradient-to-l from-primary to-secondary text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300`}
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
