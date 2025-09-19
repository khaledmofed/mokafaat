import { useIsRTL } from "@hooks";
import { ServiceProps } from "@interfaces";
import React from "react";

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  const isRTL = useIsRTL();
  const divStyle = {
    backgroundImage: `url(${service.image})`,
  };

  return (
    <div
      className="service bg-gray-200 min-h-56 bg-cover bg-no-repeat bg-center relative wow fadeInUp"
      style={divStyle}
      data-wow-delay="0.2s"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="service-content absolute bottom-6 ps-6 pe-6 text-white">
        <h1 className="text-xl wow fadeInUp" data-wow-delay="0.3s">
          {isRTL && service?.arTitle ? service.arTitle : service?.enTitle}
        </h1>
      </div>
    </div>
  );
};

export default ServiceCard;
