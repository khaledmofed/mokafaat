import { JobContentProps } from "@interfaces";
import React, { useEffect, useState } from "react";

const JobContent: React.FC<JobContentProps> = ({
  className,
  title,
  text = "",
}) => {
  const [textAsPoints, setTextAsPoints] = useState<string[]>([]);

  useEffect(() => {
    const splitText = text.split(".");

    const cleanedSplitText = splitText
      .map((piece) => piece.trim())
      .filter((piece) => piece);

    setTextAsPoints(cleanedSplitText);
  }, []);

  return (
    <div className={`${className} wow fadeInUp`} data-wow-delay="0.4">
      <h1 className="font-bold text-title text-xl mb-3 capitalize">{title}</h1>
      <ul className="text-title text-sm ms-5 list-disc pl-5 space-y-2">
        {textAsPoints.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobContent;
