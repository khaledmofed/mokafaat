import { ExperienceRowProps } from "@interfaces";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const ExperienceRow: React.FC<ExperienceRowProps> = ({
  experience,
  index,
  onDelete,
}) => {
  return (
    <div
      className="experience-row border-b border-gray-100 p-5 grid lg:grid-cols-6 md:grid-cols-2 gap-2 items-start"
    >
      <div className="job-position">
        <h6 className="text-sm">{experience.jobPosition}</h6>
      </div>
      <div className="event">
        <h6 className="text-sm">{experience.event}</h6>
      </div>
      <div className="location">
        <h6 className="text-sm">{experience.location}</h6>
      </div>
      <div className="startDate">
        <h6 className="text-sm">{experience.startDate?.toDateString()}</h6>
      </div>
      <div className="endDate">
        <h6 className="text-sm">{experience.endDate?.toDateString()}</h6>
      </div>
      <div className="actions flex md:justify-center">
        <button
          className="bg-danger text-white rounded-md text-md md:p-1 p-2 md:w-auto w-full flex justify-center"
          type="button"
          onClick={() => onDelete(index)}
        >
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default ExperienceRow;
