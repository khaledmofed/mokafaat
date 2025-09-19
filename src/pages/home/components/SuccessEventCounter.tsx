import { useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import ScrollTrigger from "react-scroll-trigger";

const SuccessEventCounter = () => {
  const [t] = useTranslation();
  const [counterOn, setCounterOn] = useState(false);

  return (
    <>
      <ScrollTrigger onEnter={() => setCounterOn(true)} />
      <section className="success-events-counter bg-primary bg-opacity-10 grid lg:grid-cols-2 grid-cols-1 mx-auto md:py-0 md:px-4 px-6 py-6">
        <div
          className="saudi-arabia-map bg-map md:min-h-96 min-h-60 md:bg-cover lg:bg-contain bg-contain bg-no-repeat bg-center wow fadeInLeft"
          data-wow-delay="0.3s"
        />
        <div className="counter-content flex flex-col items-center justify-center ">
          <h1 className="md:text-9xl text-6xl font-bold text-primary mb-4">
            +
            {(counterOn && (
              <CountUp start={0} end={200} duration={2} delay={0} />
            )) ||
              "0"}
          </h1>
          <h2
            className="md:text-3xl text-xl capitalize text-title font-semibold md:pb-10 wow fadeInUp"
            data-wow-delay="0.3s"
          >
            {t("home.success-events")}
          </h2>
        </div>
      </section>
    </>
  );
};

export default SuccessEventCounter;
