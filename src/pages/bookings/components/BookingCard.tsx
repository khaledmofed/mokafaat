import React, { useState } from "react";
import { useIsRTL } from "@hooks";
import { FiStar, FiHeart, FiShare, FiMapPin, FiUsers } from "react-icons/fi";
import { MdOutlineFlight } from "react-icons/md";

interface BookingData {
  image: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  rating: number;
  price: number;
  reviews?: number;
  departure?: string;
  arrival?: string;
  duration?: string;
  location?: string;
  amenities?: string;
  stars?: number;
  seats?: number;
  type?: string;
  transmission?: string;
}

interface BookingCardProps {
  data: BookingData;
  type: "flights" | "hotels" | "cars";
  viewMode: "grid" | "list";
  onClick?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  data,
  type,
  viewMode,
  onClick,
}) => {
  const isRTL = useIsRTL();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share clicked");
  };

  const handleBook = () => {
    // Implement booking functionality
    console.log("Book clicked");
  };

  const renderFlightCard = () => {
    if (viewMode === "list") {
      return (
        <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
          <div className="flex">
            {/* Image Section - Right */}
            <div className="w-48 h-32 relative flex-shrink-0">
              <img
                src={data.image}
                alt={data.name[isRTL ? "ar" : "en"]}
                className="w-full h-full object-cover"
              />

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={handleShare}
                  className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
                >
                  <FiShare className="text-xs" />
                </button>
                <button
                  onClick={handleFavorite}
                  className={`w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isFavorited
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    className={`text-xs ${isFavorited ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Content Section - Left */}
            <div className="flex-1 px-4 h-32 py-3 flex flex-col justify-center">
              <div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {data.name[isRTL ? "ar" : "en"]}
                </h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {data.description[isRTL ? "ar" : "en"]}
                </p>

                {/* Info and Price */}
                <div className="flex items-center justify-between gap-2 mb-0">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{data.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdOutlineFlight />
                      <span>{data.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMapPin />
                      <span>
                        {data.departure} - {data.arrival}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        ${data.price}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isRTL ? "شخص واحد" : "per person"}
                      </div>
                    </div>
                    <button
                      onClick={handleBook}
                      className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
                    >
                      {isRTL ? "احجز الآن" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View (Original Design)
    return (
      <div
        className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative h-48">
          <img
            src={data.image}
            alt={data.name[isRTL ? "ar" : "en"]}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
            >
              <FiShare className="text-sm" />
            </button>
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                isFavorited
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              <FiHeart
                className={`text-sm ${isFavorited ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                {data.name[isRTL ? "ar" : "en"]}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {data.description[isRTL ? "ar" : "en"]}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MdOutlineFlight />
                  <span>{data.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiMapPin />
                  <span>
                    {data.departure} - {data.arrival}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${data.price}
              </div>
              <div className="text-sm text-gray-600">
                {isRTL ? "شخص واحد" : "per person"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400" />
                <span className="text-sm font-medium">{data.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({data.reviews} {isRTL ? "تقييم" : "reviews"})
              </span>
            </div>
            <button
              onClick={handleBook}
              className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {isRTL ? "احجز الآن" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderHotelCard = () => {
    if (viewMode === "list") {
      return (
        <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
          <div className="flex">
            {/* Image Section - Right */}
            <div className="w-48 h-32 relative flex-shrink-0">
              <img
                src={data.image}
                alt={data.name[isRTL ? "ar" : "en"]}
                className="w-full h-full object-cover"
              />

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={handleShare}
                  className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
                >
                  <FiShare className="text-xs" />
                </button>
                <button
                  onClick={handleFavorite}
                  className={`w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isFavorited
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    className={`text-xs ${isFavorited ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Stars Badge */}
              <div className="absolute bottom-2 left-2">
                <div className="flex items-center gap-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {Array.from({ length: data.stars || 0 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className="text-yellow-400 text-xs fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content Section - Left */}
            <div className="flex-1 px-4 h-32 py-3 flex flex-col justify-center">
              <div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {data.name[isRTL ? "ar" : "en"]}
                </h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {data.description[isRTL ? "ar" : "en"]}
                </p>

                {/* Info and Price */}
                <div className="flex items-center justify-between gap-2 mb-0">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{data.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMapPin />
                      <span>{data.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600">
                        {data.amenities}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        ${data.price}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isRTL ? "ليلة واحدة" : "per night"}
                      </div>
                    </div>
                    <button
                      onClick={handleBook}
                      className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
                    >
                      {isRTL ? "احجز الآن" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View (Original Design)
    return (
      <div
        className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative h-48">
          <img
            src={data.image}
            alt={data.name[isRTL ? "ar" : "en"]}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
            >
              <FiShare className="text-sm" />
            </button>
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                isFavorited
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              <FiHeart
                className={`text-sm ${isFavorited ? "fill-current" : ""}`}
              />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {Array.from({ length: data.stars || 0 }).map((_, i) => (
                <FiStar
                  key={i}
                  className="text-yellow-400 text-xs fill-current"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                {data.name[isRTL ? "ar" : "en"]}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {data.description[isRTL ? "ar" : "en"]}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiMapPin />
                  <span>{data.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {typeof data.amenities === "string" &&
                  data.amenities
                    ?.split(",")
                    .map((amenity: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {amenity.trim()}
                      </span>
                    ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${data.price}
              </div>
              <div className="text-sm text-gray-600">
                {isRTL ? "ليلة واحدة" : "per night"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400" />
                <span className="text-sm font-medium">{data.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({data.reviews} {isRTL ? "تقييم" : "reviews"})
              </span>
            </div>
            <button
              onClick={handleBook}
              className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {isRTL ? "احجز الآن" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCarCard = () => {
    if (viewMode === "list") {
      return (
        <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
          <div className="flex">
            {/* Image Section - Right */}
            <div className="w-48 h-32 relative flex-shrink-0">
              <img
                src={data.image}
                alt={data.name[isRTL ? "ar" : "en"]}
                className="w-full h-full object-cover"
              />

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={handleShare}
                  className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
                >
                  <FiShare className="text-xs" />
                </button>
                <button
                  onClick={handleFavorite}
                  className={`w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isFavorited
                      ? "text-red-500"
                      : "text-gray-700 hover:text-red-500"
                  }`}
                >
                  <FiHeart
                    className={`text-xs ${isFavorited ? "fill-current" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Content Section - Left */}
            <div className="flex-1 px-4 h-32 py-3 flex flex-col justify-center">
              <div>
                <h3 className="text-xl font-bold text-purple-800 mb-2">
                  {data.name[isRTL ? "ar" : "en"]}
                </h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {data.description[isRTL ? "ar" : "en"]}
                </p>

                {/* Info and Price */}
                <div className="flex items-center justify-between gap-2 mb-0">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{data.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers />
                      <span>
                        {data.seats} {isRTL ? "مقاعد" : "seats"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{data.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        ${data.price}
                      </div>
                      <div className="text-xs text-gray-600">
                        {isRTL ? "يوم واحد" : "per day"}
                      </div>
                    </div>
                    <button
                      onClick={handleBook}
                      className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
                    >
                      {isRTL ? "احجز الآن" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View (Original Design)
    return (
      <div
        className="bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative h-48">
          <img
            src={data.image}
            alt={data.name[isRTL ? "ar" : "en"]}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleShare}
              className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
            >
              <FiShare className="text-sm" />
            </button>
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200 ${
                isFavorited
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              <FiHeart
                className={`text-sm ${isFavorited ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                {data.name[isRTL ? "ar" : "en"]}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {data.description[isRTL ? "ar" : "en"]}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiUsers />
                  <span>
                    {data.seats} {isRTL ? "مقاعد" : "seats"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{data.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{data.transmission}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${data.price}
              </div>
              <div className="text-sm text-gray-600">
                {isRTL ? "يوم واحد" : "per day"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400" />
                <span className="text-sm font-medium">{data.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                ({data.reviews} {isRTL ? "تقييم" : "reviews"})
              </span>
            </div>
            <button
              onClick={handleBook}
              className="bg-[#fd671a] hover:bg-[#e55a15] text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {isRTL ? "احجز الآن" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (type === "flights") return renderFlightCard();
  if (type === "hotels") return renderHotelCard();
  if (type === "cars") return renderCarCard();

  return null;
};

export default BookingCard;
