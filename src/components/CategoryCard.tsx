import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: string;
  title: string;
  alt: string;
  categoryKey?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  alt,
  categoryKey,
}) => {
  const cardContent = (
    <div
      className="bg-white rounded-xl py-6 px-2 flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-100"
      style={{
        boxShadow:
          "0 10px 15px -3px rgba(68, 7, 152, 0.1), 0 4px 6px -2px rgba(68, 7, 152, 0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 25px 50px -12px rgba(68, 7, 152, 0.25), 0 0 0 1px rgba(68, 7, 152, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 10px 15px -3px rgba(68, 7, 152, 0.1), 0 4px 6px -2px rgba(68, 7, 152, 0.05)";
      }}
    >
      {/* Icon container with gradient background */}
      <div className="w-14 h-14 mb-4 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-full group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
        <img
          src={icon}
          alt={alt}
          className="w-8 h-8 object-contain filter group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Title with better typography */}
      <span className="text-base font-semibold text-gray-800 text-center group-hover:text-purple-700 transition-colors duration-300 leading-tight">
        {title}
      </span>

      {/* Subtle bottom accent */}
      <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  // If categoryKey is provided, wrap with Link for navigation
  if (categoryKey) {
    return <Link to={`/offers/${categoryKey}`}>{cardContent}</Link>;
  }

  // Otherwise, return the card content without navigation
  return cardContent;
};

export default CategoryCard;
