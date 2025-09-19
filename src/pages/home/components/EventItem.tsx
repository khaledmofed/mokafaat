import { EventModel } from "@entities";
import { useIsRTL } from "@hooks";
import React from "react";

const EventItem: React.FC<{ event: EventModel }> = ({ event }) => {
  const isRTL = useIsRTL();
  const divStyle = {
    backgroundImage: `url(${event.image})`,
  };

  return (
    <div className="relative group wow fadeInUp overflow-hidden">
      <div
        className="overflow-hidden min-h-40 max-h-40 bg-cover bg-no-repeat bg-center relative blur-[2px] transition-all  duration-500 transform scale-100 group-hover:scale-105"
        style={divStyle}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-65" />
      </div>
      <h6
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-3 text-white 
      text-xs shadow-sm font-bold capitalize text-center z-10 break-all"
      >
        {isRTL && event?.arTitle ? event.arTitle : event?.enTitle}
      </h6>
    </div>
  );
};

export default EventItem;
