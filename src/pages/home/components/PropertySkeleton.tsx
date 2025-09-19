import React from "react";

const PropertySkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[180px] bg-gray-300" />

      {/* Content Skeleton */}
      <div className="px-4 py-6">
        {/* Property Type Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
          <div className="w-20 h-4 bg-gray-300 rounded" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-2">
          <div className="w-full h-5 bg-gray-300 rounded" />
          <div className="w-3/4 h-5 bg-gray-300 rounded" />
        </div>

        {/* Location Skeleton */}
        <div className="w-full h-4 bg-gray-300 rounded mb-3" />

        {/* Specifications Skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-20 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Divider Skeleton */}
        <div className="w-full h-px bg-gray-300 my-4" />

        {/* Price and Visit Link Skeleton */}
        <div className="flex items-center justify-between gap-1">
          <div className="w-32 h-5 bg-gray-300 rounded" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PropertySkeleton;
